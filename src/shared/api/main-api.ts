import {apiInstance} from "./axios.ts";
import {IFriend, IUserData} from "../model/app-store-types.ts";

export const MainApi = {
    async getUser(userId?: string) {
        if (!userId) {
            // return null;
        }
        try {
            const response = await apiInstance.get<IUserData>(`/user/${userId}`);
            return response.data;
        } catch (e) {
            return null;
        }
    },

    async getUserFriends(userId?: string) {
        if (!userId) {
            userId = '542918091';
            // return null;
        }
        try {
            const response = await apiInstance.get<IFriend[]>(`/user/${userId}/friends`);
            return response.data;
        } catch (e) {
            return [];
        }
    }
}