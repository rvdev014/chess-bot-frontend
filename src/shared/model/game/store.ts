import {create} from "zustand";
import {IGameStore} from "./store-types.ts";
import {socket} from "../../api/socket.ts";
import {Chess, PieceSymbol} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";

const initialStore = {
    chess: new Chess(),
    engine: new Engine(),
    gamePosition: undefined,
    opponent: null,
    isSearching: false,
    isGameOver: false,
    isViewMode: false,
    gameOverReason: null,
} as IGameStore;

const params = new URLSearchParams(window.location.search);
const userId = params.get('id');

export const useGameStore = create<IGameStore>((set, get) => {
    return {
        ...initialStore,

        onConnect() {
            console.log('Connected')
        },

        initGame(isRobot = false) {
            const initialFen = null;
            const newChess = new Chess();
            set({
                chess: newChess,
                engine: new Engine(),
                gamePosition: newChess.fen(),
            })

            if (isRobot) {
                get().engine.onMessage(({bestMove}) => {
                    if (bestMove) {
                        setTimeout(() => {
                            get().chess.move({
                                from: bestMove.substring(0, 2),
                                to: bestMove.substring(2, 4),
                                promotion: bestMove.substring(4, 5) as PieceSymbol,
                            });
                            set({gamePosition: get().chess.fen()});
                        }, 500)
                    }
                });
            }
        },

        async searchOpponent(userId: string) {
            try {
                set({isSearching: true});
                socket.emit('game:search', userId);
            } catch (e) {
                console.log(e)
            }
        },

        onGameStarted(opponent, mySide, roomId) {
            set({
                isSearching: false,
                opponent,
                isMySide: mySide,
                isMyTurn: mySide === 'w',
                roomId,
            });
        },

        onMove(movement) {
            const gameFen = get().chess.fen();
            set({
                isMyTurn: false,
                gamePosition: gameFen,
            })
            socket.emit('game:move', movement, gameFen);
        },

        onOpponentMove(movement) {
            get().chess.move(movement);
            set({
                isMyTurn: true,
                gamePosition: get().chess.fen(),
            })
        },

        onGameOver() {
            const winner = get().chess.turn() === 'w' ? 'Black' : 'White';
            set({
                isGameOver: true,
                gameOverReason: `Checkmate! ${winner} wins!`,
            })
        },

        onViewMode() {
            set({isViewMode: true});
        },

        onShareClick() {
            const roomId = get().roomId;
            const url = `http://localhost:5173/game/${roomId}`;
            navigator.clipboard.writeText(url).then(() => {
                alert('Copied to clipboard');
            });
        },

        onOpponentDisconnected() {
            console.log('Opponent disconnected')
            set({
                isGameOver: true,
                gameOverReason: 'Opponent disconnected',
            })
        },

        resetGame() {
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