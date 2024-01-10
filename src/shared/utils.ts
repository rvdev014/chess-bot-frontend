import {ReactNode} from "react";
import {modals} from "@mantine/modals";
import {UI_COLOR} from "./consts.ts";
import {IFriend, IUserData} from "./model/app-store-types.ts";

export function lcFirst(str?: string | null) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function openConfirm(children: ReactNode, onConfirm: () => void) {
    modals.openConfirmModal({
        title: 'Подтвердите действие',
        children,
        labels: {confirm: 'Да', cancel: 'Отмена'},
        confirmProps: {color: UI_COLOR, size: 'lg'},
        cancelProps: {size: 'lg'},
        groupProps: {gap: 5},
        onConfirm: () => onConfirm(),
        withCloseButton: false,
        overlayProps: {
            backgroundOpacity: 0.55,
            blur: 3,
        },
        centered: true,
    });
}

export function getFriendsData(data: IFriend[], me: IUserData) {
    return data.map(friend => {
        return ({
            value: friend?.friend_id == parseInt(me.user_id) ? friend.user_id.toString() : friend.friend_id.toString(),
            label: friend?.friend_id == parseInt(me.user_id) ? friend?.user_name : friend?.friend_name
        });
    })
}