import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Button, Loader, Modal} from "@mantine/core";
import {UI_COLOR} from "../../consts.ts";
import {MyButton} from "../my-button";

interface IProps {
    title?: string;
    opened: boolean;
    onCancel?: () => void;
}

export const ModalLoader: FC<IProps> = ({title, opened, onCancel}) => {
    return (
        <Modal
            opened={opened}
            onClose={onCancel || (() => {
            })}
            withCloseButton={false}
            size='xs'
            title={title || 'Загрузка...'}
            transitionProps={{transition: 'fade', duration: 200}}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            centered
            closeOnClickOutside={false}
        >
            <div className={styles.loaderWrapper}>
                <Loader color={UI_COLOR} size='lg' className={styles.loader}/>
                {onCancel && <MyButton onClick={onCancel}>Отмена</MyButton>}
            </div>
        </Modal>
    );
};