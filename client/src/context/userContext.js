import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      user: null,
      blockchainInfo: null,
      isAuth: false,

      login: ({ user, blockchainInfo }) =>
        set(() => ({
          user,
          blockchainInfo: blockchainInfo || null,
          isAuth: true,
        })),

      logout: () =>
        set(() => ({
          user: null,
          blockchainInfo: null,
          isAuth: false,
        })),

      setUser: (updatedUser) =>
        set(() => ({ user: updatedUser })),

      setBlockchainInfo: (info) =>
        set(() => ({ blockchainInfo: info })),
    }),

    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
