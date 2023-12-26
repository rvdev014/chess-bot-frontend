import React from 'react';

import styles from './styles.module.scss'
import {MyChessboardGuest} from "../../../widgets/my-chessboard/ui/modes/guest.tsx";
import {GuestTimer} from "./guest-timer.tsx";

export const GuestGamePanel = () => {

    console.log('GuestGamePanel')

    return (
        <div className={styles.wrapper}>
            <div className={styles.gamePanel}>
                <GuestTimer side='black'/>
                <MyChessboardGuest/>
                <GuestTimer side='white' type='bottom'/>
            </div>
        </div>
    );
};
