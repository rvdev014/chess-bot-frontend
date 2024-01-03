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

export interface IGameStore {
    isGameStarted: boolean;
    isRobot: boolean;
    isMyTurn: boolean;
    isGameOver: boolean;
    isViewMode: boolean;

    chess: Chess;
    engine: Engine;
    gamePosition: string | BoardPosition | undefined;
    roomId: string | null;
    timeLimit: number;
    robotLevel: number;

    opponent: IOpponent | null;
    opponentTimeLeft: number;

    onOpponentMove(moveState: IMoveState): void;

    onOpponentTimeChange(): void;

    onOpponentDisconnected(): void;

    mySide: SideType;
    myTimeLeft: number;

    onMove(movement: Move): void;

    onMyTimeChange(): void;

    onGameOver(winner: SideType, reason: GameOverReasonType): void;

    gameOverReason: string | null;

    initGame(isRobot: boolean): void;

    resetGame(): void;

    reset(): void;

    onGameStarted(opponent: IOpponent, mySide: SideType, roomId: string): void;

    onViewMode(): void;

    onShareClick(): void;
}