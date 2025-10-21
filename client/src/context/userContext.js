import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      login: (user) => set(() => ({ user, isAuth: true })),
      logout: () => set(() => ({ user: null, isAuth: false })),
      setUser: (updatedUser) => set((state) => ({ user: updatedUser })),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);