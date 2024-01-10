import {create} from "zustand";
import {IAppStore, ITgDataUnsafe, IUserData} from "./app-store-types.ts";
import {apiInstance} from "../api/axios.ts";

const initialStore = {
    me: null,
    isAppLoading: true,
    isTelegramWebApp: false,
} as IAppStore;

export const useAppStore = create<IAppStore>((set, get) => {
    return {
        ...initialStore,
        initTelegram: async () => {
            set({isAppLoading: true});
            // @ts-ignore
            const tg = window.Telegram.WebApp;
            tg.ready();

            const tgDataUnsafe: ITgDataUnsafe = tg.initDataUnsafe;
            if (!tgDataUnsafe?.user) {
                set({
                    isTelegramWebApp: false,
                    isAppLoading: false
                });
                return;
            }

            try {
                const me = await apiInstance.get<IUserData>(`/user/${tgDataUnsafe.user.id}`);
                set({
                    me: me.data,
                    isTelegramWebApp: true
                });
            } catch (e) {
                console.log('e', e)
            } finally {
                set({isAppLoading: false});
            }
        },
        setMe: (me) => set({me}),
        fetchMe: async () => {
            const response = await apiInstance.get('/me');
            console.log('response', response)
        }
    }
})