import {create} from "zustand";
import {IGuestGameStore} from "./store-types.ts";
import {socket} from "../../api/socket.ts";
import {Chess} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";
import {MainApi} from "../../api/main-api.ts";

const initialStore = {
    chess: new Chess(),
    engine: new Engine(),
    gamePosition: undefined,
    currentTurn: null,
    isLoading: false,
    isGameFound: false,
    isGameOver: false,
    gameOverReason: null,
} as IGuestGameStore;

export const useGuestGameStore = create<IGuestGameStore>((set, get) => {
    return {
        ...initialStore,

        onConnect() {
            console.log('Connected')
        },

        initGuestGame(roomId) {
            set({isLoading: true})
            socket.emit('game:join-guest', roomId)
        },

        async onJoinGuest(game) {
            if (game) {
                console.log('Joined as guest', game)
                const newChess = new Chess();
                if (game.lastFen) {
                    newChess.load(game.lastFen);
                }

                const whitePlayer = await MainApi.getUser(game.white.userId);
                const blackPlayer = await MainApi.getUser(game.black.userId);

                set({
                    chess: newChess,
                    engine: new Engine(),
                    gamePosition: newChess.fen(),
                    isGameFound: true,
                    isLoading: false,
                    whitePlayer,
                    blackPlayer,
                    whiteTimeLeft: game.white.timeLeft,
                    blackTimeLeft: game.black.timeLeft,
                    currentTurn: game.currentTurn,

                    roomId: game.roomId,
                });
            } else {
                console.log('Game not found')
                set({
                    isLoading: false,
                    isGameFound: false,
                })
            }
        },

        onMove(moveState) {
            const chess = get().chess;
            chess.move(moveState.movement);
            const currentTurn = chess.turn() === 'w' ? 'white' : 'black';

            set({
                currentTurn,
                gamePosition: chess.fen(),
                whiteTimeLeft: moveState.whiteTimeLeft,
                blackTimeLeft: moveState.blackTimeLeft,
            })
        },

        onTimeChange(side) {
            if (side === 'white') {
                set({whiteTimeLeft: get().whiteTimeLeft - 1})
            } else {
                set({blackTimeLeft: get().blackTimeLeft - 1})
            }
        },

        onGameOver(winner, reason) {
            set({
                isGameOver: true,
                isGameOverPopup: true,
                winner,
                gameOverReason: reason,
            })
        },

        onGameOverEvent(gameState) {
            if (gameState.winner && gameState.reason) {
                get().onGameOver(gameState.winner, gameState.reason)
                set({
                    whiteTimeLeft: gameState.white.timeLeft,
                    blackTimeLeft: gameState.black.timeLeft,
                })
            }
        },

        onOpponentDisconnected(side) {
            get().onGameOver(side === 'white' ? 'black' : 'white', 'disconnect')
        },

        onViewClick() {
            set({isGameOverPopup: false});
        },

        resetGuestGame() {
            get().engine.stop();
            const newChess = new Chess();
            set({
                chess: newChess,
                engine: new Engine(),
                gamePosition: newChess.fen(),
            });
        },

        onDisconnect() {
            console.log('Disconnected')
            socket.disconnect();
        },
    };
});