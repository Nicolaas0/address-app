/* eslint-disable unicorn/filename-case */
import { create } from 'zustand';

interface AuthStore {
    refresh: boolean;
    search: string;
    setRefresh: (refresh: boolean) => void;
    setSearch: (search: string) => void;
}

const usePostStore = create<AuthStore>((set) => ({
    refresh: false,
    search: '',
    setRefresh: (refresh) => set({ refresh }),
    setSearch: (search) => set({ search })
}));

export default usePostStore