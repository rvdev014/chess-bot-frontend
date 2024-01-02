import React from 'react';

import styles from './styles.module.scss'
import {useGameStore} from "../../../shared/model/game/store.ts";
import {MyChessboardClickable} from "../../../widgets/my-chessboard";
import {PlayerTimer} from "./player-timer.tsx";
import {Button} from "@mantine/core";

export const PlayerGamePanel = () => {
    const mySide = useGameStore(state => state.mySide);
    const onShareClick = useGameStore(state => state.onShareClick);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Button onClick={onShareClick}>Share</Button>
            </div>
            <div className={styles.gamePanel}>
                <PlayerTimer side={mySide === 'white' ? 'black' : 'white'}/>
                <MyChessboardClickable/>
                <PlayerTimer side={mySide}/>
            </div>
        </div>
    );
};
