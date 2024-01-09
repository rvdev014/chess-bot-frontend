import React, {FC, ReactNode} from 'react';
import {Modal} from "@mantine/core";

interface IProps {
    title?: string;
    opened: boolean;
    onClose?: () => void;
    children: ReactNode;
    className?: string;
    withCloseButton?: boolean;
    closeOnClickOutside?: boolean;
}

export const MyModal: FC<IProps> = ({opened, onClose, children, ...props}) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose ?? (() => {
            })}
            size="xs"
            title={props.title}
            styles={{
                title: {fontSize: '24px'}
            }}
            className={props.className}
            transitionProps={{transition: 'fade', duration: 200}}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            centered
            withCloseButton={props.withCloseButton ?? true}
            closeOnClickOutside={props.closeOnClickOutside ?? false}
        >
            {children}
        </Modal>
    );
};