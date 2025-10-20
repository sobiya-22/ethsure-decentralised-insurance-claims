import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      login: (user) => set(() => ({ user, isAuth: true })),
      logout: () => set(() => ({ user: null, isAuth: false })),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);