import React from 'react';

import styles from './styles.module.scss'
import {useGameStore} from "../../../shared/model/game/store.ts";
import {MyChessboardClickable} from "../../../widgets/my-chessboard";
import {PlayerTimer} from "./player-timer.tsx";
import {PlayerGameOverPopup} from "../../game-over-popup";

export const PlayerGamePanel = () => {
    // const timeLimit = useGameStore(state => state.timeLimit);
    const mySide = useGameStore(state => state.mySide);

    console.log('PlayerGamePanel')

    return (
        <>
            <div className={styles.gamePanel}>
                <PlayerTimer side={mySide === 'white' ? 'black' : 'white'}/>
                <MyChessboardClickable/>
                <PlayerTimer side={mySide}/>
            </div>
            <PlayerGameOverPopup/>
        </>
    );
};
