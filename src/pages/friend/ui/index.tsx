import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {PlayerGamePanel} from "../../../features/game-panel";
import {useGameStore} from "../../../shared/model/game/store.ts";
import {shallow} from "zustand/shallow";
import {socket} from "../../../shared/api/socket.ts";
import {ModalLoader} from "../../../shared/ui/loader/modal-loader.tsx";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";

export const FriendGamePage = () => {
    const roomId = useParams().room;

    const [isLoading, setIsLoading] = React.useState(true);

    const [
        onConnect,
        onDisconnect
    ] = useLobbyStore(state => [
        state.onConnect,
        state.onDisconnect
    ], shallow);

    const [
        opponent,
        onGameStarted,
        onOpponentMove,
        onOpponentDisconnected
    ] = useGameStore(state => [
        state.opponent,
        state.onGameStarted,
        state.onOpponentMove,
        state.onOpponentDisconnected
    ], shallow);

    useEffect(() => {
        if (roomId) {
            socket.emit('game:join-friend', roomId);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('game:started', (opponent, mySide, roomId) => {
            onGameStarted(opponent, mySide, roomId)
            setIsLoading(false);
        });
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
        if (!opponent) {
            return <div>RoomId is invalid!</div>
        }

        return (
            <>
                <PlayerGamePanel/>
                <ModalLoader
                    title={'Загрузка игры...'}
                    opened={isLoading}
                    onCancel={() => setIsLoading(false)}
                />
            </>
        )
    }

    return (
        <div>
            <h1 className='title'>Friend page</h1>
            {renderContent()}
        </div>
    );
};