export type NavbarButtonsType = 'home' | 'info' | 'settings' | 'exit';

export interface IFriend {
    friend_id: number;
    friend_name: string;
    user_id: number;
    user_name: string;
}

export interface IUserData {
    id: number;
    user_id: string;
    username: string;
    name: string;
    language?: any;
    referral?: any;
    gender?: any;
    active: boolean;
    age?: any;
    socket_id?: any;
    last_name: string;
    language_code: string;
    createdAt: string;
    updatedAt: string;
}

export interface ITgUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_premium: boolean;
    allows_write_to_pm: boolean;
}

export interface ITgDataUnsafe {
    query_id: string;
    user: ITgUser;
    auth_date: string;
    hash: string;
}

export interface IAppStore {
    me: IUserData | null;
    isTelegramWebApp: boolean;

    setMe: (me: IUserData) => void;
    fetchMe: () => void;
    initTelegram: () => void;
}