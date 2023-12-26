import {Chessboard} from "react-chessboard";
import React, {FC} from "react";
import {MyChessboardSimple} from "../simple.tsx";
import {useGuestGameStore} from "../../../../shared/model/guest-game/store.ts";

interface IProps extends React.ComponentProps<typeof Chessboard> {
}

export const MyChessboardGuest: FC<IProps> = () => {

    const chess = useGuestGameStore(state => state.chess);
    const gamePosition = useGuestGameStore(state => state.gamePosition);
    const isGameOver = useGuestGameStore(state => state.isGameOver);
    const gameOverReason = useGuestGameStore(state => state.gameOverReason);
    const onGameOver = useGuestGameStore(state => state.onGameOver);

    return (
        <MyChessboardSimple
            chess={chess}
            gamePosition={gamePosition}
            onGameOver={onGameOver}
            isGameOver={isGameOver}
            gameOverReason={gameOverReason}
        />
    )
}
