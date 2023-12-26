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
    gameOverReason: string | null;

    onGameOver(winner: SideType, reason: GameOverReasonType): void;
}

export const MyChessboardSimple: FC<IProps> = (
    {chess, gamePosition, ...props}
) => {

    useEffect(() => {
        if (chess.gameOver() || chess.inDraw()) {
            props.onGameOver(
                chess.turn() === 'w' ? 'black' : 'white',
                chess.inDraw() ? 'draw' : 'checkmate'
            );
            return;
        }
    }, [gamePosition])

    return (
        <div className={styles.board}>
            {props.isGameOver && (
                <div className={`${styles.overlay} ${styles.gameOverOverlay}`}>
                    <div>
                        <h2 className={styles.title}>Game is over</h2>
                        <p className={styles.text}>{props.gameOverReason}</p>
                    </div>
                </div>
            )}
            <Chessboard
                id="BasicBoard"
                arePiecesDraggable={false}
                position={gamePosition}
                animationDuration={300}
            />
        </div>
    )
}
