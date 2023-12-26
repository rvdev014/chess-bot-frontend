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
    isSearching: boolean;
    isRobot: boolean;
    isMyTurn: boolean;
    isGameOver: boolean;
    isViewMode: boolean;

    chess: Chess;
    engine: Engine;
    gamePosition: string | BoardPosition | undefined;

    opponent: IOpponent | null;
    roomId: string | null;

    timeLimit: number;
    myTimeLeft: number;
    opponentTimeLeft: number;
    mySide: SideType;
    gameOverReason: string | null;

    onConnect(): void;

    initGame(isRobot?: boolean): void;

    onGameStarted(opponent: IOpponent, mySide: SideType, roomId: string): void;

    onMove(movement: Move): void;

    onOpponentMove(moveState: IMoveState): void;

    searchOpponent(): void;

    cancelSearch(): void;

    onDisconnect(): void;

    onViewMode(): void;

    onShareClick(): void;

    onMyTimeChange(): void;

    onOpponentTimeChange(): void;

    onGameOver(winner: SideType, reason: GameOverReasonType): void;

    onOpponentDisconnected(): void;

    resetGame(): void;
}