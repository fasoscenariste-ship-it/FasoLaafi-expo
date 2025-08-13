import { create } from 'zustand';
import { getOrInitProfile, saveProfile } from '../services/storage';
import { scheduleDailyCoreReminders } from '../services/reminders';
import { Profile } from '../utils/types';

type AppState = {
  profile: Profile | null;
  initialized: boolean;
  setProfile: (p: Profile) => Promise<void>;
  init: () => Promise<void>;
};

export const useStore = create<AppState>((set, get) => ({
  profile: null,
  initialized: false,
  setProfile: async (p) => {
    await saveProfile(p);
    set({ profile: p });
    await scheduleDailyCoreReminders(p);
  },
  init: async () => {
    const profile = await getOrInitProfile();
    set({ profile, initialized: true });
    await scheduleDailyCoreReminders(profile);
  }
}));

export const useAppInit = () => useStore(s => s.init);
export const useProfile = () => useStore(s => s.profile);
export const useInitialized = () => useStore(s => s.initialized);
