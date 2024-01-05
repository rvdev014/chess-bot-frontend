import React, {FC, useEffect} from "react";
import {useGameStore} from "../../../../shared/model/game/store.ts";
import {useClickableBoard} from "../../model/useClickableBoard.ts";
import {MyChessboard} from "../default.tsx";
import {shallow} from "zustand/shallow";
import {GameOverPopup} from "../../../../features/game-over-popup/ui";
import {useLobbyStore} from "../../../../shared/model/lobby/store.ts";
import {history} from "../../../../app/router/router-history.ts";

interface IProps {
    isRobot?: boolean;
}

export const MyChessboardClickable: FC<IProps> = ({isRobot = false}) => {

    const [
        chess,
        engine,
        gamePosition,
        mySide,
        myTimeLeft,
        opponentTimeLeft,
        robotLevel,
        isMyTurn,
        isGameOver,
        isGameOverPopup,
        setGameOverPopup,
        winner,
        gameOverReason,
        onViewMode,
        initGame,
        resetGame,
        onMove,
        onGameOver,
    ] = useGameStore(state => [
        state.chess,
        state.engine,
        state.gamePosition,
        state.mySide,
        state.myTimeLeft,
        state.opponentTimeLeft,
        state.robotLevel,
        state.isMyTurn,
        state.isGameOver,
        state.isGameOverPopup,
        state.setGameOverPopup,
        state.winner,
        state.gameOverReason,
        state.onViewMode,
        state.initGame,
        state.resetGame,
        state.onMove,
        state.onGameOver,
    ], shallow);

    function onHomeClick() {
        useLobbyStore.getState().reset();
        useGameStore.getState().reset();
        history.push('/');
    }

    const {
        moveTo,
        optionSquares,
        showPromotionDialog,
        onSquareClick,
        onPromotionPieceSelect
    } = useClickableBoard(chess, mySide, onMove, isGameOver);

    useEffect(() => {
        initGame(isRobot);
        return () => resetGame();
    }, []);

    return (
        <>
            <MyChessboard
                type={'clickable'}
                isRobot={isRobot}
                robotLevel={robotLevel}
                chess={chess}
                engine={engine}
                gamePosition={gamePosition}
                mySide={mySide}
                isMyTurn={isMyTurn}
                isGameOver={isGameOver}
                onGameOver={onGameOver}
                onSquareClick={onSquareClick}
                onPromotionPieceSelect={onPromotionPieceSelect}
                customSquareStyles={optionSquares}
                promotionToSquare={moveTo}
                showPromotionDialog={showPromotionDialog}
            />

            <GameOverPopup
                winner={winner}
                whiteTimeLeft={mySide === 'white' ? myTimeLeft : opponentTimeLeft}
                blackTimeLeft={mySide === 'black' ? myTimeLeft : opponentTimeLeft}
                gameOverReason={gameOverReason}
                isOpen={isGameOverPopup}
                setOpen={setGameOverPopup}
                onViewMode={onViewMode}
                onHomeClick={onHomeClick}
            />
        </>
    )
}
