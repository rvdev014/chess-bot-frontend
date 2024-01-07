import {Chess} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";
import {BoardPosition} from "react-chessboard/dist/chessboard/types";
import {GameOverReasonType, IMoveState, ISocketClient, SideType} from "../game/store-types.ts";
import {IUserData} from "../app-store-types.ts";

export interface IPlayerState {
    userId: string;
    socketId: string;
    timeLeft: number;
}

export interface IGameState {
    roomId: string;
    white: IPlayerState;
    black: IPlayerState;
    currentTurn: SideType | null;
    lastFen: string | null;
    winner?: SideType | null;
    reason?: GameOverReasonType | null;
}

export interface IGuestGameStore {
    chess: Chess;
    engine: Engine;
    gamePosition: string | BoardPosition | undefined;
    roomId: string | null;
    currentTurn: SideType | null;
    whitePlayer: IUserData | null;
    blackPlayer: IUserData | null;
    whiteTimeLeft: number;
    blackTimeLeft: number;

    isLoading: boolean;
    isGameFound: boolean;
    isGameOver: boolean;
    isGameOverPopup: boolean;

    setGameOverPopup(isGameOverPopup: boolean): void;

    onViewClick(): void;

    gameOverReason: GameOverReasonType | null;
    winner: SideType | null;

    onConnect(): void;

    onJoinGuest(game: IGameState): void;

    initGuestGame(roomId: string): void;

    onMove(moveState: IMoveState): void;

    onTimeChange(side: SideType): void;

    onDisconnect(): void;

    onGameOver(winner: SideType, reason: GameOverReasonType): void;

    onGameOverEvent(gameState: IGameState): void;

    onOpponentDisconnected(side: SideType): void;

    resetGuestGame(): void;
}