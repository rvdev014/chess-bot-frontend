import React from 'react';
import {GameOverPopup} from "./index.tsx";
import {useGameStore} from "../../../shared/model/game/store.ts";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";

export const PlayerGameOverPopup = () => {

    const me = useAppStore(state => state.me);
    const onHomeClick = useLobbyStore(state => state.onHomeClick);

    const [
        winner,
        mySide,
        myTimeLeft,
        opponent,
        opponentTimeLeft,
        isGameOverPopup,
        setGameOverPopup,
        onViewClick,
        gameOverReason,
    ] = useGameStore(state => [
        state.winner,
        state.mySide,
        state.myTimeLeft,
        state.opponent,
        state.opponentTimeLeft,
        state.isGameOverPopup,
        state.setGameOverPopup,
        state.onViewClick,
        state.gameOverReason,
    ]);

    return (
        <GameOverPopup
            winner={winner}
            whiteTimeLeft={mySide === 'white' ? myTimeLeft : opponentTimeLeft}
            blackTimeLeft={mySide === 'black' ? myTimeLeft : opponentTimeLeft}
            whitePlayerName={mySide === 'white' ? (me?.username || 'Вы') : (opponent?.username ?? 'Соперник')}
            blackPlayerName={mySide === 'black' ? (me?.username || 'Вы') : (opponent?.username ?? 'Соперник')}
            gameOverReason={gameOverReason}
            isOpen={isGameOverPopup}
            setOpen={setGameOverPopup}
            onViewClick={onViewClick}
            onHomeClick={onHomeClick}
        />
    );
};