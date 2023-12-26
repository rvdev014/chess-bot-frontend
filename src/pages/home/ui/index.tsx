import React, {useEffect} from 'react';
import {SearchOpponent} from "../../../features/search-opponent";
import {useGameStore} from "../../../shared/model/game/store.ts";
import {socket} from "../../../shared/api/socket.ts";
import {GameLobby} from "../../../features/game-lobby";

import styles from './styles.module.scss'

export const HomePage = () => {
    const opponent = useGameStore(state => state.opponent);
    const onConnect = useGameStore(state => state.onConnect);
    const onDisconnect = useGameStore(state => state.onDisconnect);
    const onGameStarted = useGameStore(state => state.onGameStarted);
    const onOpponentMove = useGameStore(state => state.onOpponentMove);
    const onOpponentDisconnected = useGameStore(state => state.onOpponentDisconnected);

    useEffect(() => {
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('game:started', onGameStarted);
        socket.on('game:move', onOpponentMove);
        socket.on('game:disconnected', onOpponentDisconnected);

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('game:started');
            socket.off('game:move');
            socket.off('game:disconnected');
        };
    }, []);

    console.log('Home page render');

    return (
        <div className={styles.wrapper}>
            {opponent ?
                <GameLobby/> :
                <>
                    <h1>Let's chess</h1>
                    <SearchOpponent/>
                </>}
        </div>
    );
};