import React, {FC, PropsWithChildren} from 'react';
import {Button, ButtonProps} from "@mantine/core";

type DefaultProps = PropsWithChildren & ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

interface IProps extends DefaultProps {
}

export const MyButton: FC<IProps> = ({...props}) => {
    return (
        <Button
            size={'md'}
            color='#b58863'
            {...props}
        >
            {props.children}
        </Button>
    );
};