import React from "react";
import {MyChessboardSimple} from "../simple.tsx";
import {useGuestGameStore} from "../../../../shared/model/guest-game/store.ts";
import {shallow} from "zustand/shallow";

export const MyChessboardGuest = () => {

    const [
        chess,
        gamePosition,
        isGameOver,
        gameOverReason,
        onGameOver,
    ] = useGuestGameStore(state => [
        state.chess,
        state.gamePosition,
        state.isGameOver,
        state.gameOverReason,
        state.onGameOver,
    ], shallow);

    return (
        <>
            <MyChessboardSimple
                chess={chess}
                gamePosition={gamePosition}
                onGameOver={onGameOver}
                isGameOver={isGameOver}
                gameOverReason={gameOverReason}
            />
        </>
    )
}
