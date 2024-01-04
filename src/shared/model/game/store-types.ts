import {Move} from "chess.ts/dist/types";
import {Chess} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";
import {BoardPosition} from "react-chessboard/dist/chessboard/types";

export interface IOpponent {
    userId?: string;
    socketId: string;
    timeLeft?: number;
}

export type SideType = 'white' | 'black';
export type GameOverReasonType = 'checkmate' | 'timeout' | 'resign' | 'draw' | 'disconnect';

export interface IGameOptions {
    timeLimit?: number;
    robotLevel?: number;
}

export interface IMoveState {
    movement: any;
    lastFen: string;
    side: 'white' | 'black';
    whiteTimeLeft: number;
    blackTimeLeft: number;
}

export interface IGameOverState {
    winner: SideType;
    reason: GameOverReasonType;
    whiteTimeLeft: number;
    blackTimeLeft: number;
}

export interface IBoardState {
    chess: Chess;
    engine: Engine;
    gamePosition: string | BoardPosition | undefined;
    isRobot: boolean;
    robotLevel?: number;
    mySide: SideType;
    isMyTurn: boolean;
    isGameOver: boolean;
    onGameOver(winner: SideType, reason: GameOverReasonType): void;
}

export interface IGameStore extends IBoardState {
    isGameStarted: boolean;
    onGameStarted(opponent: IOpponent, mySide: SideType, roomId: string): void;

    winner: SideType | null;
    gameOverReason: GameOverReasonType | null;
    isGameOverPopup: boolean;
    setGameOverPopup(isGameOverPopup: boolean): void;

    onViewMode(): void;
    onShareClick(): void;

    roomId: string | null;
    timeLimit: number;

    opponent: IOpponent | null;
    opponentTimeLeft: number;
    onOpponentMove(moveState: IMoveState): void;
    onOpponentTimeChange(): void;
    onOpponentDisconnected(): void;

    myTimeLeft: number;
    onMove(movement: Move): void;
    onMyTimeChange(): void;

    onGameOverEvent(gameState: IGameOverState): void;
    initGame(isRobot: boolean): void;
    resetGame(): void;

    reset(): void;
}