import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Button, Modal} from "@mantine/core";
import {RadioButtonGroup} from "../../../shared/ui/radio-button-group";
import {IGameOptionsForm} from "../../../shared/model/lobby/store-types.ts";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {shallow} from "zustand/shallow";
import {MyButton} from "../../../shared/ui/my-button";

export const GameOptionsModal: FC = () => {

    const [
        isGameOptionsModal,
        onCloseGameOptionsModal,
        onSubmitGameOptionsForm,
    ] = useLobbyStore(state => [
        state.isGameOptionsModal,
        state.onCloseGameOptionsModal,
        state.onSubmitGameOptionsForm,
    ], shallow);

    const [fields, setFields] = React.useState<IGameOptionsForm>({});

    function onChangeField(key: keyof IGameOptionsForm, value: any) {
        setFields({...fields, [key]: value})
    }

    function onSubmitForm(e: any) {
        e.preventDefault();
        onSubmitGameOptionsForm(fields)
    }

    return (
        <Modal
            opened={isGameOptionsModal}
            onClose={onCloseGameOptionsModal}
            size='xs'
            title='Настройки игры'
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
                    value={fields.time || 15}
                    onChange={item => onChangeField('time', item.value)}
                />

                <RadioButtonGroup
                    label="Сложность"
                    data={[
                        {value: 1, label: 'Легко'},
                        {value: 2, label: 'Средне'},
                        {value: 3, label: 'Сложно'},
                    ]}
                    value={fields.level || 1}
                    onChange={item => onChangeField('level', item.value)}
                />

                <MyButton type='submit'>Играть</MyButton>
            </form>
        </Modal>
    );
};