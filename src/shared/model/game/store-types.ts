import {Move} from "chess.ts/dist/types";
import {Chess} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";
import {BoardPosition} from "react-chessboard/dist/chessboard/types";

export interface IOpponent {
    userId?: string;
    socketId: string;
}

export type Side = 'w' | 'b';

export interface IGameStore {
    isSearching: boolean;

    chess: Chess;
    engine: Engine;
    gamePosition: string | BoardPosition | undefined;

    opponent: IOpponent | null;
    roomId: string | null;

    isMySide: Side;
    isMyTurn: boolean;
    isGameOver: boolean;
    isViewMode: boolean;
    gameOverReason: string | null;

    onConnect(): void;

    initGame(isRobot: boolean): void;

    onGameStarted(opponent: IOpponent, mySide: Side, roomId: string): void;

    onMove(movement: Move): void;

    onOpponentMove(movement: Move): void;

    searchOpponent(userId: string): void;

    onDisconnect(): void;

    onViewMode(): void;

    onShareClick(): void;

    onGameOver(): void;

    onOpponentDisconnected(): void;

    resetGame(): void;
}