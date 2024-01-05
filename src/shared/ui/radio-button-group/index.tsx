import React, {FC} from 'react';
import styles from './styles.module.scss';
import {Button} from "@mantine/core";
import {UI_COLOR} from "../../consts.ts";

interface IDataItem {
    value: any;
    label: string;
}

interface IProps {
    data: IDataItem[];
    label: string;
    value: any;
    onChange: (e: any) => void;
}

export const RadioButtonGroup: FC<IProps> = ({data, label, value, onChange}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>{label}</div>
            <div className={styles.buttonsWrapper}>
                {data.map((item, index) => (
                    <Button
                        key={index}
                        className={styles.button}
                        variant={value === item.value ? '' : 'light'}
                        onClick={() => onChange(item)}
                        color={UI_COLOR}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};