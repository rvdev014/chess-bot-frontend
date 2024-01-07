import React, {FC, useEffect} from 'react';
import styles from "./styles.module.scss";
import {Loader, Modal, Select} from "@mantine/core";
import {RadioButtonGroup} from "../../../shared/ui/radio-button-group";
import {ICreateRoomForm} from "../../../shared/model/lobby/store-types.ts";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {shallow} from "zustand/shallow";
import {MyButton} from "../../../shared/ui/my-button";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {MainApi} from "../../../shared/api/main-api.ts";
import {IFriend} from "../../../shared/model/app-store-types.ts";
import {UI_COLOR} from "../../../shared/consts.ts";

export const CreateRoomModal: FC = () => {

    const me = useAppStore(state => state.me);
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
            <Modal
                title='Ожидание друга'
                opened={isWaitingFriend}
                onClose={() => {
                }}
                withCloseButton={false}
                closeOnClickOutside={false}
                centered
            >
                <p className={styles.text}>Ссылка на игру отправлена другу</p>
                {/*<div className={styles.inviteUrlWrapper}>
                    <Input
                        size='xs'
                        defaultValue={inviteUrl}
                        className={styles.inviteUrl}
                        readOnly={true}
                    />
                    <MyButton
                        size='xs'
                        className={styles.btn}
                        onClick={() => navigator.clipboard.writeText(inviteUrl)}
                    >
                        <FaCopy/>
                    </MyButton>
                </div>*/}
                <div className={styles.inviteLoaderWrapper}>
                    <div className={styles.inviteLoader}>
                        <Loader color={UI_COLOR} size='md'/>
                        {/*<span className={styles.loaderText}>Ожидание друга...</span>*/}
                    </div>
                    <MyButton className={styles.cancelBtn} onClick={onCancelWaitingFriend}>Отмена</MyButton>
                </div>
            </Modal>
        );
    }

    if (!isCreateRoomModal) return null;

    return (
        <Modal
            opened={isCreateRoomModal}
            onClose={onCloseCreateRoomModal}
            size='xs'
            title='Создать комнату'
            transitionProps={{transition: 'fade', duration: 200}}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            centered
            closeOnClickOutside={false}
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

                <Select
                    label="Выберите друга"
                    className={styles.field}
                    value={fields.friendId}
                    placeholder={friends?.length > 0 ? 'Выберите друга' : 'Сначала добавьте друга'}
                    data={friends.map(friend => {
                        console.log(friend?.friend_id, me?.user_id)
                        return ({
                            value: parseInt(friend?.friend_id) === parseInt(me?.user_id) ? friend?.user_id.toString() : friend?.friend_id,
                            label: parseInt(friend?.friend_id) === parseInt(me?.user_id) ? friend?.user_name : friend?.friend_name
                        });
                    })}
                    onChange={value => onChangeField('friendId', value)}
                />

                <MyButton type='submit'>Пригласить друга</MyButton>
            </form>
        </Modal>
    );
};