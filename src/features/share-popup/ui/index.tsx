import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Input, Modal, MultiSelect} from "@mantine/core";
import {useGameStore} from "../../../shared/model/game/store.ts";
import {shallow} from "zustand/shallow";
import {MyButton} from "../../../shared/ui/my-button";
import {FaCopy} from "react-icons/fa";
import {IFriend} from "../../../shared/model/app-store-types.ts";
import {MainApi} from "../../../shared/api/main-api.ts";
import {useAppStore} from "../../../shared/model/app-store.ts";

export const SharePopup = () => {

    const me = useAppStore(state => state.me);
    const [friends, setFriends] = React.useState<IFriend[]>([]);
    const [friendIds, setFriendIds] = React.useState<string[]>([]);

    const [
        roomId,
        isSharePopup,
        setSharePopup,
        onShareFriend,
    ] = useGameStore(state => [
        state.roomId,
        state.isSharePopup,
        state.setSharePopup,
        state.onShareFriend,
    ], shallow);

    useEffect(() => {
        (async () => {
            const friends = await MainApi.getUserFriends(me?.user_id);
            if (friends) {
                setFriends(friends);
            }
        })()
    }, []);

    function getInviteUrl() {
        return `http://localhost:5173/guest/${roomId}`;
    }

    return (
        <Modal
            opened={isSharePopup}
            onClose={() => setSharePopup(false)}
            size="xs"
            title="Поделиться"
            className={styles.modal}
            transitionProps={{transition: 'fade', duration: 200}}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            centered
            closeOnClickOutside={false}
        >
            <div className={styles.wrapper}>
                <p className={styles.text}>Скопируйте ссылку на игру</p>
                <div className={styles.inviteUrlWrapper}>
                    <Input
                        size='xs'
                        defaultValue={getInviteUrl()}
                        className={styles.inviteUrl}
                        readOnly={true}
                    />
                    <MyButton
                        size='xs'
                        className={styles.btn}
                        onClick={() => navigator.clipboard.writeText(getInviteUrl())}
                    >
                        <FaCopy/>
                    </MyButton>
                </div>

                <p className={styles.text}>Или сразу отправьте ссылку другу</p>
                <MultiSelect
                    label="Выберите друга"
                    className={styles.friendsSelect}
                    value={friendIds}
                    placeholder="Выберите друга"
                    data={friends.map(friend => ({value: friend.friend_id.toString(), label: friend.friend_name}))}
                    onChange={value => setFriendIds(value)}
                />

                <MyButton className={styles.sendBtn} onClick={() => onShareFriend(friendIds)}>
                    Отправить
                </MyButton>
            </div>
        </Modal>
    );
};