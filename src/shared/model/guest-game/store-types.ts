import {Move} from "chess.ts/dist/types";
import {Chess} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";
import {BoardPosition} from "react-chessboard/dist/chessboard/types";

export interface IOpponent {
    userId?: string;
    socketId: string;
}

export type Side = 'w' | 'b';

export interface IGuestGameStore {
    chess: Chess;
    engine: Engine;
    gamePosition: string | BoardPosition | undefined;
    roomId: string | null;

    isLoading: boolean;
    isGameFound: boolean;
    isGameOver: boolean;
    gameOverReason: string | null;

    onConnect(): void;

    onJoinGuest(game: any): void;

    initGuestGame(roomId: string): void;

    onMove(movement: Move): void;

    onDisconnect(): void;

    onGameOver(): void;

    onOpponentDisconnected(): void;

    resetGuestGame(): void;
}