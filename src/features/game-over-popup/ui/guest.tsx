import React from 'react';
import {GameOverPopup} from "./index.tsx";
import {useGuestGameStore} from "../../../shared/model/guest-game/store.ts";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {shallow} from "zustand/shallow";

export const GuestGameOverPopup = () => {

    const onHomeClick = useLobbyStore(state => state.onHomeClick);

    const [
        winner,
        whitePlayer,
        blackPlayer,
        whiteTimeLeft,
        blackTimeLeft,
        gameOverReason,
        onViewClick,
        isGameOverPopup,
        setGameOverPopup,
    ] = useGuestGameStore(state => [
        state.winner,
        state.whitePlayer,
        state.blackPlayer,
        state.whiteTimeLeft,
        state.blackTimeLeft,
        state.gameOverReason,
        state.onViewClick,
        state.isGameOverPopup,
        state.setGameOverPopup,
    ], shallow);

    return (
        <GameOverPopup
            winner={winner}
            whiteTimeLeft={whiteTimeLeft}
            blackTimeLeft={blackTimeLeft}
            whitePlayerName={whitePlayer?.username ?? 'Белый'}
            blackPlayerName={blackPlayer?.username ?? 'Чёрный'}
            gameOverReason={gameOverReason}
            isOpen={isGameOverPopup}
            setOpen={setGameOverPopup}
            onViewClick={onViewClick}
            onHomeClick={onHomeClick}
        />
    );
};