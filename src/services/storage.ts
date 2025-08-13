import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../utils/types';

const PROFILE_KEY = 'faso.profile';
const FEED_KEY = 'faso.feed';

export async function getOrInitProfile(): Promise<Profile> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  if (raw) return JSON.parse(raw);
  const defaultProfile: Profile = {
    name: 'Ami',
    age: 25,
    sex: 'F',
    environment: 'urban',
    concerns: ['stress', 'hygiène'],
    language: 'fr',
    reminderHours: { morning: '07:00', midday: '12:00', evening: '20:00' }
  };
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
  return defaultProfile;
}

export async function saveProfile(p: Profile) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export type FeedPost = {
  id: string;
  author: string;
  region: string;
  text: string;
  createdAt: number;
  audioUri?: string;
  likes: number;
};

export async function getFeed(): Promise<FeedPost[]> {
  const raw = await AsyncStorage.getItem(FEED_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addPost(p: FeedPost) {
  const posts = await getFeed();
  posts.unshift(p);
  await AsyncStorage.setItem(FEED_KEY, JSON.stringify(posts));
}
