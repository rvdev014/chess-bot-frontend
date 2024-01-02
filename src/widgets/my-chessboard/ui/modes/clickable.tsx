import {FC, useEffect} from "react";
import {useGameStore} from "../../../../shared/model/game/store.ts";
import {useClickableBoard} from "../../model/useClickableBoard.ts";
import {MyChessboard} from "../default.tsx";

interface IProps {
    isRobot?: boolean;
}

export const MyChessboardClickable: FC<IProps> = ({isRobot = false}) => {

    const chess = useGameStore(state => state.chess);
    const engine = useGameStore(state => state.engine);
    const gamePosition = useGameStore(state => state.gamePosition);

    const mySide = useGameStore(state => state.mySide);
    const robotLevel = useGameStore(state => state.robotLevel);
    const isMyTurn = useGameStore(state => state.isMyTurn);
    const isGameOver = useGameStore(state => state.isGameOver);
    const gameOverReason = useGameStore(state => state.gameOverReason);
    const isViewMode = useGameStore(state => state.isViewMode);
    const onViewMode = useGameStore(state => state.onViewMode);

    const initGame = useGameStore(state => state.initGame);
    const resetGame = useGameStore(state => state.resetGame);
    const onMove = useGameStore(state => state.onMove);
    const onGameOver = useGameStore(state => state.onGameOver);

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
        <MyChessboard
            isRobot={isRobot}
            level={robotLevel}
            type={'clickable'}
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
            onSquareClick={onSquareClick}
            onPromotionPieceSelect={onPromotionPieceSelect}
            customSquareStyles={optionSquares}
            promotionToSquare={moveTo}
            showPromotionDialog={showPromotionDialog}
        />
    )
}
