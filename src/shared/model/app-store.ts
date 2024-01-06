import {create} from "zustand";
import {IAppStore, ITgDataUnsafe, IUserData} from "./app-store-types.ts";
import {apiInstance} from "../api/axios.ts";

const initialStore = {
    me: null,
} as IAppStore;

export const useAppStore = create<IAppStore>((set, get) => {
    return {
        ...initialStore,
        initTelegram: async () => {
            // @ts-ignore
            const tg = window.Telegram.WebApp;
            tg.ready();

            const tgDataUnsafe: ITgDataUnsafe = tg.initDataUnsafe;
            if (!tgDataUnsafe?.user) return;

            const me = await apiInstance.get<IUserData>(`/user/${tgDataUnsafe.user.id}`);
            set({me: me.data});
        },
        setMe: (me) => set({me}),
        fetchMe: async () => {
            const response = await apiInstance.get('/me');
            console.log('response', response)
        }
    }
})