import React, {FC, useEffect} from "react";
import {useGameStore} from "../../../../shared/model/game/store.ts";
import {useClickableBoard} from "../../model/useClickableBoard.ts";
import {MyChessboard} from "../default.tsx";
import {shallow} from "zustand/shallow";

interface IProps {
    isRobot?: boolean;
}

export const MyChessboardClickable: FC<IProps> = ({isRobot = false}) => {

    const [
        chess,
        engine,
        gamePosition,
        mySide,
        robotLevel,
        isMyTurn,
        isGameOver,
        initGame,
        resetGame,
        onMove,
        onGameOver,
    ] = useGameStore(state => [
        state.chess,
        state.engine,
        state.gamePosition,
        state.mySide,
        state.robotLevel,
        state.isMyTurn,
        state.isGameOver,
        state.initGame,
        state.resetGame,
        state.onMove,
        state.onGameOver,
    ], shallow);

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
        </>
    )
}
