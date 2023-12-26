import React, {useEffect} from 'react';
import {useGameStore} from "../../../shared/model/game/store.ts";
import {socket} from "../../../shared/api/socket.ts";
import {GameLobby} from "../../../features/game-lobby";

import styles from './styles.module.scss'
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();

    const opponent = useGameStore(state => state.opponent);
    const onConnect = useGameStore(state => state.onConnect);
    const onDisconnect = useGameStore(state => state.onDisconnect);
    const onGameStarted = useGameStore(state => state.onGameStarted);
    const onOpponentMove = useGameStore(state => state.onOpponentMove);
    const onOpponentDisconnected = useGameStore(state => state.onOpponentDisconnected);

    const searchLoading = useGameStore(state => state.isSearching);
    const searchOpponent = useGameStore(state => state.searchOpponent);
    const cancelSearch = useGameStore(state => state.cancelSearch);

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

    const onPlayWithRobot = () => {
        navigate('/robot');
    }

    function renderContent() {
        switch (true) {
            case !!opponent:
                return <GameLobby/>;
            default:
                return (
                    <div className={styles.searchWrapper}>
                        <h1 className='title'>Let's Chess!</h1>
                        {searchLoading
                            ?
                            <>
                                <p className={styles.loader}>Searching...</p>
                                <button className={styles.btn} onClick={cancelSearch}>
                                    Cancel
                                </button>
                            </>
                            :
                            <>
                                <button className={styles.btn} onClick={searchOpponent}>
                                    Search opponent
                                </button>
                                <button className={styles.btn} onClick={onPlayWithRobot}>
                                    Player vs Robot
                                </button>
                            </>}
                    </div>
                );
        }
    }

    return (
        <div className={styles.wrapper}>
            {renderContent()}
        </div>
    );
};