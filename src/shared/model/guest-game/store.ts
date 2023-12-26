import {create} from "zustand";
import {IGuestGameStore} from "./store-types.ts";
import {socket} from "../../api/socket.ts";
import {Chess} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";

const initialStore = {
    chess: new Chess(),
    engine: new Engine(),
    gamePosition: undefined,
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
                set({
                    chess: newChess,
                    engine: new Engine(),
                    gamePosition: newChess.fen(),
                    isGameFound: true,
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

        onMove(movement) {
            get().chess.move(movement);
            set({gamePosition: get().chess.fen()})
        },

        onGameOver() {
            const winner = get().chess.turn() === 'w' ? 'Black' : 'White';
            set({
                isGameOver: true,
                gameOverReason: `Checkmate! ${winner} wins!`,
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