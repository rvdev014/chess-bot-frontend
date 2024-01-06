import React, {useEffect} from 'react';
import {useGameStore} from "../../../shared/model/game/store.ts";
import {socket} from "../../../shared/api/socket.ts";

import styles from './styles.module.scss'
import {PlayerGamePanel} from "../../../features/game-panel";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {shallow} from "zustand/shallow";
import {LocalLobby} from "./local-lobby.tsx";
import {ModalLoader} from "../../../shared/ui/loader/modal-loader.tsx";
import {Button} from "@mantine/core";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {MyButton} from "../../../shared/ui/my-button";

export const HomeLobby = () => {

    const [
        roomId,
        onGameStarted,
        onOpponentMove,
        onOpponentDisconnected
    ] = useGameStore(state => [
        state.roomId,
        state.onGameStarted,
        state.onOpponentMove,
        state.onOpponentDisconnected
    ], shallow);

    const [
        isPlayingLocal,
        isSearchingOpponent,
        onConnect,
        onPlayLocal,
        onDisconnect,
        onCancelSearch,
        onSearchOpponent
    ] = useLobbyStore(state => [
        state.isPlayingLocal,
        state.isSearching,
        state.onConnect,
        state.onPlayLocal,
        state.onDisconnect,
        state.onCancelSearch,
        state.onSearchOpponent
    ], shallow);

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

    function renderContent() {
        console.log('roomId', roomId)
        switch (true) {
            case !!roomId:
                return <PlayerGamePanel/>;

            case isPlayingLocal:
                return <LocalLobby/>;

            default:
                return (
                    <>
                        <div className={styles.lobbyWrapper}>
                            <h1 className='title'>Let's Chess!</h1>
                            <MyButton size='md' className={styles.btn} onClick={onPlayLocal}>
                                Играть локально
                            </MyButton>
                            <MyButton size='md' className={styles.btn} onClick={onSearchOpponent}>
                                Играть онлайн
                            </MyButton>
                        </div>
                        <ModalLoader
                            title={'Ищем соперника...'}
                            opened={isSearchingOpponent}
                            onCancel={onCancelSearch}
                        />
                    </>
                );
        }
    }

    return (
        <>
            {renderContent()}
        </>
    );
};