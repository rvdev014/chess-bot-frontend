import {create} from "zustand";
import {IAppStore, ITgDataUnsafe, IUserData} from "./app-store-types.ts";
import {apiInstance} from "../api/axios.ts";

const initialStore = {
    me: null,
} as IAppStore;

export const useAppStore = create<IAppStore>((set, get) => {
    return {
        ...initialStore,
        initTelegram: () => {
            // @ts-ignore
            const tg = window.Telegram.WebApp;
            tg.ready();

            const tgDataUnsafe: ITgDataUnsafe = tg.initDataUnsafe;
            if (!tgDataUnsafe?.user) return;

            const me = {
                fio: `${tgDataUnsafe.user.first_name} ${tgDataUnsafe.user.last_name}`,
                username: tgDataUnsafe.user.username,
                // avatar: tgDataUnsafe.user.photo_url,
                chatId: tgDataUnsafe.user.id.toString(),
            } as IUserData;

            set({me});
        },
        setMe: (me) => set({me}),
        fetchMe: async () => {
            const response = await apiInstance.get('/me');
            console.log('response', response)
        }
    }
})