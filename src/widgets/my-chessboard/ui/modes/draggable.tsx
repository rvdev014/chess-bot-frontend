import React, {FC, useEffect} from "react";
import {Square} from "chess.ts/dist/types";
import {useGameStore} from "../../../../shared/model/game/store.ts";
import {MyChessboard} from "../default.tsx";
import {shallow} from "zustand/shallow";

interface IProps {
    isRobot?: boolean;
}

export const MyChessboardDraggable: FC<IProps> = ({isRobot = false}) => {

    const [
        chess,
        engine,
        gamePosition,
        mySide,
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
        state.isMyTurn,
        state.isGameOver,
        state.initGame,
        state.resetGame,
        state.onMove,
        state.onGameOver,
    ], shallow);

    useEffect(() => {
        initGame(isRobot);
        return () => resetGame();
    }, []);

    function onPieceDrop(sourceSquare: Square, targetSquare: Square): boolean {

        const chessTurnFull = chess.turn() === "w" ? "white" : "black";
        if (mySide && chessTurnFull !== mySide) return false;

        const move = chess.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });
        if (move === null) {
            return false;
        }

        onMove(move);

        return true;
    }

    console.log('MyChessboardDraggable')

    return (
        <>
            <MyChessboard
                isRobot={isRobot}
                type={'draggable'}
                chess={chess}
                engine={engine}
                gamePosition={gamePosition}
                mySide={mySide}
                isMyTurn={isMyTurn}
                isGameOver={isGameOver}
                onGameOver={onGameOver}
                onPieceDrop={onPieceDrop}
            />
        </>
    )
}
