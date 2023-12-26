import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {socket} from "../../../shared/api/socket.ts";
import {MyChessboardSimple} from "../../../widgets/my-chessboard/ui/simple.tsx";
import {useGuestGameStore} from "../../../shared/model/guest-game/store.ts";

export const GamePage = () => {
    const roomId = useParams().room;
    console.log('roomId', roomId)

    const chess = useGuestGameStore(state => state.chess);
    const gamePosition = useGuestGameStore(state => state.gamePosition);
    const isLoading = useGuestGameStore(state => state.isLoading);
    const isGameFound = useGuestGameStore(state => state.isGameFound);
    const isGameOver = useGuestGameStore(state => state.isGameOver);
    const gameOverReason = useGuestGameStore(state => state.gameOverReason);
    const onGameOver = useGuestGameStore(state => state.onGameOver);

    const initGuestGame = useGuestGameStore(state => state.initGuestGame);
    const resetGuestGame = useGuestGameStore(state => state.resetGuestGame);
    const onConnect = useGuestGameStore(state => state.onConnect);
    const onJoinGuest = useGuestGameStore(state => state.onJoinGuest);
    const onDisconnect = useGuestGameStore(state => state.onDisconnect);
    const onMove = useGuestGameStore(state => state.onMove);
    const onOpponentDisconnected = useGuestGameStore(state => state.onOpponentDisconnected);

    useEffect(() => {
        if (roomId) {
            initGuestGame(roomId);
        }

        socket.on('game:join-guest', onJoinGuest)
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('game:move', onMove);
        socket.on('game:disconnected', onOpponentDisconnected);

        return () => {
            resetGuestGame();
            socket.off('game:join-guest')
            socket.off('connect');
            socket.off('disconnect');
            socket.off('game:move');
            socket.off('game:disconnected');
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
                    <MyChessboardSimple
                        chess={chess}
                        gamePosition={gamePosition}
                        onGameOver={onGameOver}
                        isGameOver={isGameOver}
                        gameOverReason={gameOverReason}
                    />
                );
        }
    }

    return (
        <div>
            <h1>Guest page</h1>
            {renderContent()}
        </div>
    );
};