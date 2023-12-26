import {FC, useEffect} from "react";
import {Square} from "chess.ts/dist/types";
import {useGameStore} from "../../../../shared/model/game/store.ts";
import {MyChessboard} from "../default.tsx";

interface IProps {
    isRobot?: boolean;
}

export const MyChessboardDraggable: FC<IProps> = ({isRobot = false}) => {

    const chess = useGameStore(state => state.chess);
    const engine = useGameStore(state => state.engine);
    const gamePosition = useGameStore(state => state.gamePosition);

    const mySide = useGameStore(state => state.mySide);
    const isMyTurn = useGameStore(state => state.isMyTurn);
    const isGameOver = useGameStore(state => state.isGameOver);
    const gameOverReason = useGameStore(state => state.gameOverReason);
    const isViewMode = useGameStore(state => state.isViewMode);
    const onViewMode = useGameStore(state => state.onViewMode);

    const initGame = useGameStore(state => state.initGame);
    const resetGame = useGameStore(state => state.resetGame);
    const onMove = useGameStore(state => state.onMove);
    const onGameOver = useGameStore(state => state.onGameOver);

    useEffect(() => {
        initGame(isRobot);
        return () => resetGame();
    }, []);

    function onPieceDrop(sourceSquare: Square, targetSquare: Square): boolean {
        // compare isMySide
        if (mySide && chess.turn() !== mySide) return false;

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
        <MyChessboard
            isRobot={isRobot}
            type={'draggable'}
            chess={chess}
            engine={engine}
            gamePosition={gamePosition}
            mySide={mySide}
            isMyTurn={isMyTurn}
            isGameOver={isGameOver}
            gameOverReason={gameOverReason}
            isViewMode={isViewMode}
            onViewMode={onViewMode}
            onGameOver={onGameOver}
            onPieceDrop={onPieceDrop}
        />
    )
}
