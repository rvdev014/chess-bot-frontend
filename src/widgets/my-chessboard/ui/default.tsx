import {Chessboard} from "react-chessboard";
import React, {FC, useEffect} from "react";

import styles from './style.module.scss'
import {Chess} from "chess.ts";
import {Engine} from "../model/engine.ts";
import {BoardPosition} from "react-chessboard/dist/chessboard/types";
import {Side} from "../../../shared/model/game/store-types.ts";

interface IProps extends React.ComponentProps<typeof Chessboard> {
    initialFen?: string;
    type: 'draggable' | 'clickable';
    isRobot?: boolean;
    level?: number;
    chess: Chess;
    engine: Engine;
    gamePosition: string | BoardPosition | undefined;
    isMySide: Side;
    isMyTurn: boolean;
    isGameOver: boolean;
    gameOverReason: string | null;
    isViewMode: boolean;

    onViewMode(): void;
    onGameOver(): void;
}

export const MyChessboard: FC<IProps> = (
    {type, chess, engine, gamePosition, ...props}
) => {

    useEffect(() => {
        if (chess.gameOver() || chess.inDraw()) {
            props.onGameOver();
            return;
        }

        if (chess.turn() !== props.isMySide && props.isRobot) {
            findBestMove();
        }
    }, [gamePosition])

    function findBestMove() {
        engine.evaluatePosition(chess.fen(), props.level ?? 1);
    }

    return (
        <div className={styles.board}>
            {(props.isGameOver && !props.isViewMode) && (
                <div className={`${styles.overlay} ${styles.gameOverOverlay}`}>
                    <div>
                        <h2 className={styles.title}>Game is over</h2>
                        <p className={styles.text}>{props.gameOverReason}</p>
                        <button className={styles.viewBtn} onClick={props.onViewMode}>View board</button>
                    </div>
                </div>
            )}
            {(!props.isMyTurn && !props.isGameOver) && <div className={`${styles.overlay} ${styles.turnOverlay}`}/>}
            <Chessboard
                id="BasicBoard"
                arePiecesDraggable={type === 'draggable'}
                position={gamePosition}
                animationDuration={300}
                boardOrientation={props.isMySide === "w" ? 'white' : 'black'}
                {...props}
            />
        </div>
    )
}
