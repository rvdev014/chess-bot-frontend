import React, {FC} from 'react';
import styles from './styles.module.scss';
import {Button} from "@mantine/core";
import {UI_COLOR} from "../../consts.ts";
import {MyButton} from "../my-button";

interface IDataItem {
    value: any;
    label: string;
}

interface IProps {
    data: IDataItem[];
    label: string;
    value: any;
    onChange: (e: any) => void;
    className?: string;
}

export const RadioButtonGroup: FC<IProps> = ({data, label, value, onChange, ...props}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>{label}</div>
            <div className={styles.buttonsWrapper}>
                {data.map((item, index) => (
                    <MyButton
                        key={index}
                        className={`${styles.button} ${props.className}`}
                        variant={value === item.value ? '' : 'light'}
                        onClick={() => onChange(item)}
                        color={UI_COLOR}
                    >
                        {item.label}
                    </MyButton>
                ))}
            </div>
        </div>
    );
};