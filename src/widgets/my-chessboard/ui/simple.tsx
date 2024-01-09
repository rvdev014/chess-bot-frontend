import {Chessboard} from "react-chessboard";
import React, {FC, useEffect} from "react";

import styles from './style.module.scss'
import {Chess} from "chess.ts";
import {BoardPosition} from "react-chessboard/dist/chessboard/types";
import {GameOverReasonType, SideType} from "../../../shared/model/game/store-types.ts";

interface IProps extends React.ComponentProps<typeof Chessboard> {
    chess: Chess;
    gamePosition: string | BoardPosition | undefined;
    isGameOver: boolean;
    gameOverReason: GameOverReasonType | null;

    onGameOver(winner: SideType, reason: GameOverReasonType): void;
}

export const MyChessboardSimple: FC<IProps> = (
    {chess, gamePosition, ...props}
) => {
    return (
        <div className={styles.board} style={{width: `${window.innerWidth < 500 ? `${window.innerWidth - 20}px` : ''}`}}>
            <Chessboard
                id="BasicBoard"
                arePiecesDraggable={false}
                position={gamePosition}
                animationDuration={300}
            />
        </div>
    )
}
