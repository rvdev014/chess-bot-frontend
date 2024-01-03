import {create} from "zustand";
import {IAppStore} from "./app-store-types.ts";

const initialStore = {
    navbarButtons: ['info'],
} as IAppStore;

export const useAppStore = create<IAppStore>((set, get) => {
    return {
        ...initialStore,
        setNavbarButtons: (navbarButtons) => set({navbarButtons}),
    }
})