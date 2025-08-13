import * as Location from 'expo-location';

export type SimpleWeather = {
  temperatureC: number | null;
  isHot: boolean;
  isRainy: boolean;
};

export async function getApproxWeather(): Promise<SimpleWeather> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') throw new Error('no-permission');
    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.coords.latitude}&longitude=${loc.coords.longitude}&current=temperature_2m,rain`;
    const res = await fetch(url);
    const data = await res.json();
    const t = data?.current?.temperature_2m ?? null;
    const rain = data?.current?.rain ?? 0;
    return { temperatureC: t, isHot: (t ?? 0) >= 32, isRainy: rain > 0.0 };
  } catch (e) {
    // Offline / permission denied fallback
    return { temperatureC: null, isHot: false, isRainy: false };
  }
}
