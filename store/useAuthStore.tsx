/* eslint-disable unicorn/filename-case */
import { create } from 'zustand';

interface AuthStore {
  user: any; // Replace 'any' with the appropriate type for your user object
  setUser: (user: any) => void; // Replace 'any' with the appropriate type for your user object
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore