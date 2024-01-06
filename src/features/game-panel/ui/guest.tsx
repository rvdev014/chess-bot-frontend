import React from 'react';

import styles from './styles.module.scss'
import {MyChessboardGuest} from "../../../widgets/my-chessboard/ui/modes/guest.tsx";
import {GuestTimer} from "./guest-timer.tsx";
import {GuestGameOverPopup} from "../../game-over-popup";

export const GuestGamePanel = () => {
    return (
        <>
            <div className={styles.gamePanel}>
                <GuestTimer side='black'/>
                <MyChessboardGuest/>
                <GuestTimer side='white' type='bottom'/>
            </div>
            <GuestGameOverPopup/>
        </>
    );
};
