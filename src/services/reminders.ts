import * as Notifications from 'expo-notifications';
import dayjs from 'dayjs';
import { getApproxWeather } from './weather';
import { hydrationFrequencyPerDay } from './ai';
import { Profile } from '../utils/types';

export async function askNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyCoreReminders(profile: Profile) {
  const granted = await askNotificationPermission();
  if (!granted) return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  const weather = await getApproxWeather();
  const hydrationPerDay = hydrationFrequencyPerDay(weather.isHot);

  // Morning: hydration + boost
  await scheduleAtLocalTime(profile.reminderHours.morning, 'Hydratation', 'Bois un verre d’eau pour bien démarrer la journée.');
  await scheduleAtLocalTime(profile.reminderHours.morning, 'Boost du jour', '3 minutes de mouvements inspirés du sabar !');

  // Midday: hand wash + hydration pulses
  await scheduleAtLocalTime(profile.reminderHours.midday, 'Hygiène', 'Pense à te laver les mains avant le repas.');

  const intervalMinutes = Math.floor(12 * 60 / Math.max(1, hydrationPerDay - 2)); // distribute between morning and evening
  const start = dayjs().startOf('day').add(9, 'hour'); // from 09:00
  for (let i = 0; i < hydrationPerDay - 2; i++) {
    const t = start.add(i * intervalMinutes, 'minute');
    await scheduleDaily(t.hour(), t.minute(), 'Hydratation', 'Un petit verre d’eau 💧');
  }

  // Evening: meditation
  await scheduleAtLocalTime(profile.reminderHours.evening, 'Méditation', '5 minutes pour respirer et écouter un conte.');
}

async function scheduleAtLocalTime(hhmm: string, title: string, body: string) {
  const [h, m] = hhmm.split(':').map(x => parseInt(x, 10));
  await scheduleDaily(h, m, title, body);
}

async function scheduleDaily(hour: number, minute: number, title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { hour, minute, repeats: true }
  });
}
