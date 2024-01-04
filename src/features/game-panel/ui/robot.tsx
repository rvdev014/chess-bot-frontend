import React from 'react';

import styles from './styles.module.scss'
import {useGameStore} from "../../../shared/model/game/store.ts";
import {MyChessboardClickable} from "../../../widgets/my-chessboard";
import {PlayerTimer} from "./player-timer.tsx";

export const RobotGamePanel = () => {
    const mySide = useGameStore(state => state.mySide);

    return (
        <div className={styles.wrapper}>
            <div className={styles.gamePanel}>
                {/*<PlayerTimer side={'black'}/>*/}
                <MyChessboardClickable isRobot={true}/>
                <PlayerTimer side={mySide}/>
            </div>
        </div>
    );
};
