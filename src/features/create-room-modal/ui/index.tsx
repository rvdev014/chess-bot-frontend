import React, {FC, useEffect} from 'react';
import styles from "./styles.module.scss";
import {Loader, Select} from "@mantine/core";
import {RadioButtonGroup} from "../../../shared/ui/radio-button-group";
import {ICreateRoomForm} from "../../../shared/model/lobby/store-types.ts";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {shallow} from "zustand/shallow";
import {MyButton} from "../../../shared/ui/my-button";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {MainApi} from "../../../shared/api/main-api.ts";
import {IFriend} from "../../../shared/model/app-store-types.ts";
import {UI_COLOR} from "../../../shared/consts.ts";
import {MyModal} from "../../../shared/ui/my-modal";
import {getFriendsData} from "../../../shared/utils.ts";

export const CreateRoomModal: FC = () => {

    const me = useAppStore(state => state.me);
    const isTelegramWebApp = useAppStore(state => state.isTelegramWebApp);
    const [friends, setFriends] = React.useState<IFriend[]>([]);

    const [
        inviteUrl,
        isWaitingFriend,
        isCreateRoomModal,
        onCancelWaitingFriend,
        onCloseCreateRoomModal,
        onSubmitCreateRoomForm,
    ] = useLobbyStore(state => [
        state.inviteUrl,
        state.isWaitingFriend,
        state.isCreateRoomModal,
        state.onCancelWaitingFriend,
        state.onCloseCreateRoomModal,
        state.onSubmitCreateRoomForm,
    ], shallow);

    const [fields, setFields] = React.useState<ICreateRoomForm>({});

    useEffect(() => {
        (async () => {
            const friends = await MainApi.getUserFriends(me?.user_id);
            if (friends) {
                setFriends(friends);
            }
        })()
    }, []);

    function onChangeField(key: string, value: any) {
        setFields({...fields, [key]: value})
    }

    function onSubmitForm(e: any) {
        e.preventDefault();

        if (!fields?.friendId) {
            return;
        }

        onSubmitCreateRoomForm(fields)
    }


    if (isWaitingFriend) {
        return (
            <MyModal title='Ожидание друга' opened={isWaitingFriend}>
                <p className={styles.text}>Ссылка на игру отправлена другу</p>
                <div className={styles.inviteLoaderWrapper}>
                    <div className={styles.inviteLoader}>
                        <Loader color={UI_COLOR} size='md'/>
                        {/*<span className={styles.loaderText}>Ожидание друга...</span>*/}
                    </div>
                    <MyButton className={styles.cancelBtn} onClick={onCancelWaitingFriend}>Отмена</MyButton>
                </div>
            </MyModal>
        );
    }

    return (
        <MyModal
            opened={isCreateRoomModal}
            onClose={onCloseCreateRoomModal}
            title='Создать комнату'
        >
            <form className={styles.formWrapper} onSubmit={onSubmitForm}>
                <RadioButtonGroup
                    label="Время на ход (мин)"
                    data={[
                        // {value: 0, label: '-'},
                        {value: 5, label: '5'},
                        {value: 10, label: '10'},
                        {value: 15, label: '15'},
                    ]}
                    value={fields.timeLimit || 15}
                    onChange={item => onChangeField('timeLimit', item.value)}
                />

                {isTelegramWebApp &&
                    <Select
                        size='lg'
                        label="Выберите друга"
                        className={styles.field}
                        value={fields.friendId}
                        placeholder={friends?.length > 0 ? 'Выберите друга' : 'Сначала добавьте друга'}
                        data={me ? getFriendsData(friends, me) : []}
                        // data={friends.map(friend => ({value: friend.friend_id.toString(), label: friend.friend_name}))}
                        onChange={value => onChangeField('friendId', value)}
                    />}

                <MyButton type='submit'>Пригласить друга</MyButton>
            </form>
        </MyModal>
    );
};