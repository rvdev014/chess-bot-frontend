import React, {FC, useEffect, useRef} from 'react';
import styles from "./styles.module.scss";
import {format} from "../model/utils.ts";

interface IProps {
    isRunning: boolean;
    timeLeft?: number;

    onTimeChange(): void;

    username?: string;
    type?: 'top' | 'bottom';
}

export const Timer: FC<IProps> = ({isRunning, ...props}) => {

    const timer = useRef<number>();

    useEffect(() => {

        if (isRunning) {
            timer.current = setInterval(() => {
                props.onTimeChange();
            }, 1000);
        } else {
            clearInterval(timer.current);
        }

        return () => {
            clearInterval(timer.current);
        }
    }, [isRunning]);

    return (
        <div className={`${styles.playerWrapper} ${props.type === 'bottom' ? styles.bottomSide : ''}`}>
            <div className={styles.playerName}>
                {props.username}
            </div>
            <div className={styles.playerTime}>
                {format(props.timeLeft)}
            </div>
        </div>
    );
};