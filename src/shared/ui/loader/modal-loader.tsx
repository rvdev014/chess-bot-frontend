import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Loader} from "@mantine/core";
import {UI_COLOR} from "../../consts.ts";
import {MyButton} from "../my-button";
import {MyModal} from "../my-modal";

interface IProps {
    title?: string;
    opened: boolean;
    onCancel?: () => void;
}

export const ModalLoader: FC<IProps> = ({title, opened, onCancel}) => {
    return (
        <MyModal
            opened={opened}
            onClose={onCancel || (() => {
            })}
            withCloseButton={false}
            title={title || 'Загрузка...'}
        >
            <div className={styles.loaderWrapper}>
                <Loader color={UI_COLOR} size='lg' className={styles.loader}/>
                {onCancel && <MyButton onClick={onCancel}>Отмена</MyButton>}
            </div>
        </MyModal>
    );
};