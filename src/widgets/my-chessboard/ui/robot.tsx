import {Chessboard} from "react-chessboard";
import {Chess, PieceSymbol} from "chess.ts";
import {FC, useEffect, useMemo, useState} from "react";

import styles from './style.module.scss'
import {Engine} from "../model/engine";

interface IProps {
    side: 'w' | 'b' | null;
    level?: number;
}

export const RobotChessboard: FC<IProps> = ({side, level = 1}) => {
    const engine = useMemo(() => new Engine(), []);
    const game = useMemo(() => new Chess(), []);

    const [gamePosition, setGamePosition] = useState(game.fen());


    // game.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');

    useEffect(() => {
        if (game.gameOver() || game.inDraw()) {
            alert('Game over')
            return;
        }
    }, [game, gamePosition]);

    function findBestMove() {
        engine.evaluatePosition(game.fen(), level);

        engine.onMessage(({bestMove}) => {
            if (bestMove) {
                // In latest chess.js versions you can just write ```game.move(bestMove)```
                game.move({
                    from: bestMove.substring(0, 2),
                    to: bestMove.substring(2, 4),
                    promotion: bestMove.substring(4, 5) as PieceSymbol,
                });

                setGamePosition(game.fen());
            }
        });
    }

    function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece[1].toLowerCase() as PieceSymbol ?? "q",
        });
        setGamePosition(game.fen());

        // illegal move
        if (move === null) return false;

        findBestMove();
        return true;
    }

    return (
        <div className={styles.board}>
            <Chessboard
                id="PlayVsStockfish"
                position={gamePosition}
                onPieceDragEnd={() => console.log('onPieceDragEnd')}
                onPieceDrop={onDrop}
            />
        </div>
    );
}
