import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Button, Loader, Modal, Select} from "@mantine/core";
import {RadioButtonGroup} from "../../../shared/ui/radio-button-group";
import {ICreateRoomForm} from "../../../shared/model/lobby/store-types.ts";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {shallow} from "zustand/shallow";
import {ModalLoader} from "../../../shared/ui/loader/modal-loader.tsx";

export const CreateRoomModal: FC = () => {

    const [
        isWaitingFriend,
        isCreateRoomModal,
        onCancelWaitingFriend,
        onCloseCreateRoomModal,
        onSubmitCreateRoomForm,
    ] = useLobbyStore(state => [
        state.isWaitingFriend,
        state.isCreateRoomModal,
        state.onCancelWaitingFriend,
        state.onCloseCreateRoomModal,
        state.onSubmitCreateRoomForm,
    ], shallow);

    const [fields, setFields] = React.useState<ICreateRoomForm>({});

    function onChangeField(key: string, value: any) {
        setFields({...fields, [key]: value})
    }

    function onSubmitForm(e: any) {
        e.preventDefault();
        onSubmitCreateRoomForm(fields)
    }

    if (isWaitingFriend) {
        return (
            <ModalLoader
                title={'Ожидаем друга...'}
                opened={isWaitingFriend}
                onCancel={onCancelWaitingFriend}
            />
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
                        {value: 0, label: '-'},
                        {value: 5, label: '5'},
                        {value: 10, label: '10'},
                        {value: 15, label: '15'},
                    ]}
                    value={fields.time || 0}
                    onChange={item => onChangeField('time', item.value)}
                />

                <Select
                    label="Выберите друга"
                    className={styles.field}
                    placeholder="Выберите друга"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                    onChange={value => onChangeField('friend', value)}
                />

                <Button color='#b58863' size='md' type='submit'>Пригласить друга</Button>
            </form>
        </Modal>
    );
};