import {Chessboard} from "react-chessboard";
import React, {FC, useEffect} from "react";

import styles from './style.module.scss'
import {IBoardState} from "../../../shared/model/game/store-types.ts";

interface IProps extends IBoardState, React.ComponentProps<typeof Chessboard> {
    type: 'draggable' | 'clickable';
}

export const MyChessboard: FC<IProps> = (
    {type, chess, engine, gamePosition, ...props}
) => {

    useEffect(() => {
        if (chess.gameOver() || chess.inDraw()) {
            props.onGameOver(
                chess.turn() === 'w' ? 'black' : 'white',
                chess.inDraw() ? 'draw' : 'checkmate'
            );
            return;
        }
        const chessTurn = chess.turn() === 'w' ? 'white' : 'black';
        if (chessTurn !== props.mySide && props.isRobot) {
            findBestMove();
        }
    }, [gamePosition])

    function findBestMove() {
        engine.evaluatePosition(chess.fen(), props.robotLevel ?? 1);
    }

    return (
        <div className={styles.board}>
            {(!props.isMyTurn && !props.isGameOver) && <div className={`${styles.overlay} ${styles.turnOverlay}`}/>}
            <Chessboard
                id="BasicBoard"
                arePiecesDraggable={(type === 'draggable' && !props.isGameOver)}
                position={gamePosition}
                animationDuration={300}
                boardOrientation={props.mySide}
                {...props}
            />
        </div>
    )
}
