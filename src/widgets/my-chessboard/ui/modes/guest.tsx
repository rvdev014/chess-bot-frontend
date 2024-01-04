import {Chessboard} from "react-chessboard";
import React, {FC} from "react";
import {MyChessboardSimple} from "../simple.tsx";
import {useGuestGameStore} from "../../../../shared/model/guest-game/store.ts";
import {GameOverPopup} from "../../../../features/game-over-popup/ui";
import {shallow} from "zustand/shallow";
import {useLobbyStore} from "../../../../shared/model/lobby/store.ts";
import {useGameStore} from "../../../../shared/model/game/store.ts";
import {history} from "../../../../app/router/router-history.ts";

interface IProps extends React.ComponentProps<typeof Chessboard> {
}

export const MyChessboardGuest: FC<IProps> = () => {

    const [
        chess,
        gamePosition,
        isGameOver,
        isGameOverPopup,
        setGameOverPopup,
        onViewMode,
        gameOverReason,
        winner,
        onGameOver,
    ] = useGuestGameStore(state => [
        state.chess,
        state.gamePosition,
        state.isGameOver,
        state.isGameOverPopup,
        state.setGameOverPopup,
        state.onViewMode,
        state.gameOverReason,
        state.winner,
        state.onGameOver,
    ], shallow);

    function onHomeClick() {
        useLobbyStore.getState().reset();
        useGameStore.getState().reset();
        history.push('/');
    }

    return (
        <>
            <MyChessboardSimple
                chess={chess}
                gamePosition={gamePosition}
                onGameOver={onGameOver}
                isGameOver={isGameOver}
                gameOverReason={gameOverReason}
            />

            <GameOverPopup
                winner={winner}
                gameOverReason={gameOverReason}
                isOpen={isGameOverPopup}
                setOpen={setGameOverPopup}
                onViewMode={onViewMode}
                onHomeClick={onHomeClick}
            />
        </>
    )
}
