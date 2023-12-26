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

    const isMyTurn = useGameStore(state => state.isMyTurn);
    const isMySide = useGameStore(state => state.isMySide);
    const isGameOver = useGameStore(state => state.isGameOver);
    const isViewMode = useGameStore(state => state.isViewMode);
    const gameOverReason = useGameStore(state => state.gameOverReason);
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
    } = useClickableBoard(chess, isMySide, onMove);

    useEffect(() => {
        initGame(isRobot);
        return () => resetGame();
    }, []);

    console.log('MyChessboardClickable')

    return (
        <MyChessboard
            type={'clickable'}
            chess={chess}
            engine={engine}
            gamePosition={gamePosition}
            isMyTurn={isMyTurn}
            isMySide={isMySide}
            isGameOver={isGameOver}
            isViewMode={isViewMode}
            onViewMode={onViewMode}
            gameOverReason={gameOverReason}
            onGameOver={onGameOver}
            onSquareClick={onSquareClick}
            onPromotionPieceSelect={onPromotionPieceSelect}
            customSquareStyles={optionSquares}
            promotionToSquare={moveTo}
            showPromotionDialog={showPromotionDialog}
        />
    )
}
