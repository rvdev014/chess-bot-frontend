import {ReactNode} from "react";
import {modals} from "@mantine/modals";
import {UI_COLOR} from "./consts.ts";

export function lcFirst(str?: string | null) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function openConfirm(children: ReactNode, onConfirm: () => void) {
    modals.openConfirmModal({
        title: 'Подтвердите действие',
        children,
        labels: {confirm: 'Да', cancel: 'Отмена'},
        confirmProps: {color: UI_COLOR},
        groupProps: {gap: 5},
        onConfirm: () => onConfirm(),
        withCloseButton: false,
    });
}