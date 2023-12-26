import React from 'react';

import styles from './styles.module.scss'
import {useGameStore} from "../../../shared/model/game/store.ts";
import {MyChessboardClickable} from "../../../widgets/my-chessboard";

export const GameLobby = () => {
    const onShareClick = useGameStore(state => state.onShareClick);



    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <button onClick={onShareClick}>Share</button>
            </div>
            <MyChessboardClickable/>
        </div>
    );
};
