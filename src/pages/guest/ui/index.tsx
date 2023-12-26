import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {socket} from "../../../shared/api/socket.ts";
import {useGuestGameStore} from "../../../shared/model/guest-game/store.ts";
import {GuestGamePanel} from "../../../features/game-panel";

export const GuestGamePage = () => {
    const roomId = useParams().room;

    const isLoading = useGuestGameStore(state => state.isLoading);
    const isGameFound = useGuestGameStore(state => state.isGameFound);

    const initGuestGame = useGuestGameStore(state => state.initGuestGame);
    const resetGuestGame = useGuestGameStore(state => state.resetGuestGame);
    const onConnect = useGuestGameStore(state => state.onConnect);
    const onJoinGuest = useGuestGameStore(state => state.onJoinGuest);
    const onDisconnect = useGuestGameStore(state => state.onDisconnect);
    const onMove = useGuestGameStore(state => state.onMove);
    const onOpponentDisconnected = useGuestGameStore(state => state.onOpponentDisconnected);
    const onGameOverEvent = useGuestGameStore(state => state.onGameOverEvent);

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

    function renderContent() {
        switch (true) {
            case isLoading:
                return <div>Loading...</div>;
            case !isGameFound:
                return <div>Room id is invalid!</div>;
            default:
                return (
                    <GuestGamePanel/>
                );
        }
    }

    return (
        <div>
            <h1 className='title'>Guest page</h1>
            {renderContent()}
        </div>
    );
};