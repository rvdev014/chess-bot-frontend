import {create} from "zustand";
import {IGuestGameStore} from "./store-types.ts";
import {socket} from "../../api/socket.ts";
import {Chess} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";
import {gameOverLabels} from "../../../features/game-panel/model/utils.ts";
import {lcFirst} from "../../utils.ts";

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
            socket.emit('game:join-guest', roomId)
        },

        onJoinGuest(game) {
            if (game) {
                console.log('Joined as guest', game)
                const newChess = new Chess();
                if (game.lastFen) {
                    newChess.load(game.lastFen);
                }

                console.log('game', game)

                set({
                    chess: newChess,
                    engine: new Engine(),
                    gamePosition: newChess.fen(),
                    isGameFound: true,

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
                gameOverReason: `${lcFirst(winner)} won! ${gameOverLabels[reason]}`,
            })
        },

        onGameOverEvent(gameState) {
            console.log('gameState', gameState)
            set({
                isGameOver: true,
                gameOverReason: `${lcFirst(gameState.winner)} won! ${gameState.reason ? gameOverLabels[gameState.reason] : ''}`,
                whiteTimeLeft: gameState.white.timeLeft,
                blackTimeLeft: gameState.black.timeLeft,
            })
        },

        onOpponentDisconnected() {
            console.log('Opponent disconnected')
            set({
                isGameOver: true,
                gameOverReason: 'Opponent disconnected',
            })
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