import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {socket} from "../../../shared/api/socket.ts";
import {useGuestGameStore} from "../../../shared/model/guest-game/store.ts";
import {GuestGamePanel} from "../../../features/game-panel";
import {shallow} from "zustand/shallow";
import {ModalLoader} from "../../../shared/ui/loader/modal-loader.tsx";

export const GuestGamePage = () => {
    const roomId = useParams().room;

    const [
        isLoading,
        isGameFound,
        initGuestGame,
        resetGuestGame,
        onConnect,
        onJoinGuest,
        onDisconnect,
        onMove,
        onOpponentDisconnected,
        onGameOverEvent,
    ] = useGuestGameStore(state => [
        state.isLoading,
        state.isGameFound,
        state.initGuestGame,
        state.resetGuestGame,
        state.onConnect,
        state.onJoinGuest,
        state.onDisconnect,
        state.onMove,
        state.onOpponentDisconnected,
        state.onGameOverEvent,
    ], shallow);

    useEffect(() => {
        if (roomId) {
            initGuestGame(roomId);
        }

        socket.on('game:join-guest', onJoinGuest)
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('game:move', onMove);
        socket.on('game:disconnected', onOpponentDisconnected);
        socket.on('game:over', onGameOverEvent);

        return () => {
            resetGuestGame();
            socket.off('game:join-guest')
            socket.off('connect');
            socket.off('disconnect');
            socket.off('game:move');
            socket.off('game:disconnected');
            socket.off('game:over');
        };
    }, []);

    return (
        <>
            {isGameFound ?
                <>
                    <GuestGamePanel/>
                    <ModalLoader opened={isLoading}/>
                </> :
                <div>Room id is invalid!</div>}
        </>
    );
};