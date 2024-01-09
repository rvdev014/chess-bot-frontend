import React, {FC, PropsWithChildren} from 'react';
import {Button, ButtonProps} from "@mantine/core";
import {UI_COLOR} from "../../../consts.ts";

type DefaultProps = PropsWithChildren & ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

interface IProps extends DefaultProps {
}

export const MyButton: FC<IProps> = ({...props}) => {
    return (
        <Button
            size='lg'
            color={UI_COLOR}
            {...props}
        >
            {props.children}
        </Button>
    );
};