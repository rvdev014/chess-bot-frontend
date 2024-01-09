import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {CopyButton, Input, MultiSelect} from "@mantine/core";
import {useGameStore} from "../../../shared/model/game/store.ts";
import {shallow} from "zustand/shallow";
import {MyButton} from "../../../shared/ui/my-button";
import {FaCheck, FaCopy} from "react-icons/fa";
import {IFriend} from "../../../shared/model/app-store-types.ts";
import {MainApi} from "../../../shared/api/main-api.ts";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {MyModal} from "../../../shared/ui/my-modal";
import {getFriendsData} from "../../../shared/utils.ts";

export const SharePopup = () => {

    const me = useAppStore(state => state.me);
    const isTelegramWebApp = useAppStore(state => state.isTelegramWebApp);
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
        <MyModal
            opened={isSharePopup}
            onClose={() => setSharePopup(false)}
            title="Поделиться"
            className={styles.modal}
            closeOnClickOutside={false}
        >
            <div className={styles.wrapper}>

                {!isTelegramWebApp &&
                    <>
                        <p className={styles.text}>Скопируйте ссылку на игру</p>
                        <div className={styles.inviteUrlWrapper}>
                            <Input
                                size='lg'
                                defaultValue={getInviteUrl()}
                                className={styles.inviteUrl}
                                readOnly={true}
                            />
                            <CopyButton value={getInviteUrl()}>
                                {({copied, copy}) => (
                                    <MyButton
                                        size='lg'
                                        className={styles.btn}
                                        onClick={copy}
                                        // color={copied ? 'green' : UI_COLOR}
                                    >
                                        {copied ? <FaCheck/> : <FaCopy/>}
                                    </MyButton>
                                )}
                            </CopyButton>
                        </div>
                    </>}

                {isTelegramWebApp &&
                    <>
                        <p className={styles.text}>Отправьте ссылку другу</p>
                        <MultiSelect
                            size='lg'
                            label="Выберите друга"
                            className={styles.friendsSelect}
                            value={friendIds}
                            placeholder="Выберите друга"
                            data={me ? getFriendsData(friends, me) : []}
                            onChange={value => setFriendIds(value)}
                        />
                    </>}

                <MyButton className={styles.sendBtn} onClick={() => onShareFriend(friendIds)}>
                    Отправить
                </MyButton>
            </div>
        </MyModal>
    );
};