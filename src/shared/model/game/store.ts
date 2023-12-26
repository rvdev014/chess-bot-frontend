import {create} from "zustand";
import {IGameOverState, IGameStore, IMoveState} from "./store-types.ts";
import {socket} from "../../api/socket.ts";
import {Chess, PieceSymbol} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";
import {gameOverLabels} from "../../../features/game-panel/model/utils.ts";
import {lcFirst} from "../../utils.ts";

const defaultTimeLimit = 10;

const initialStore = {
    chess: new Chess(),
    engine: new Engine(),
    gamePosition: undefined,
    opponent: null,
    isSearching: false,
    isGameOver: false,
    isViewMode: false,
    gameOverReason: null,
    timeLimit: defaultTimeLimit,
    myTimeLeft: defaultTimeLimit,
    opponentTimeLeft: defaultTimeLimit,
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
            const newChess = new Chess();
            set({
                chess: newChess,
                engine: new Engine(),
                gamePosition: newChess.fen(),
                isRobot
            })

            if (isRobot) {
                set({mySide: 'white', isMyTurn: true});
                get().engine.onMessage(({bestMove}) => {
                    if (bestMove) {
                        setTimeout(() => {
                            get().chess.move({
                                from: bestMove.substring(0, 2),
                                to: bestMove.substring(2, 4),
                                promotion: bestMove.substring(4, 5) as PieceSymbol,
                            });
                            set({
                                isMyTurn: true,
                                gamePosition: get().chess.fen()
                            });
                        }, 500)
                    }
                });
            }
        },

        searchOpponent() {
            set({isSearching: true});
            socket.emit('game:search', userId);
        },

        cancelSearch() {
            set({isSearching: false});
            socket.emit('game:search-cancel');
        },

        onGameStarted(opponent, mySide, roomId) {
            set({
                isSearching: false,
                opponent,
                mySide,
                roomId,
                isMyTurn: mySide === 'white',
            });
        },

        onMove(movement) {
            const lastFen = get().chess.fen();
            set({
                isMyTurn: false,
                gamePosition: lastFen,
            })

            const mySide = get().mySide;
            if (!get().isRobot) {
                const moveState = {
                    movement,
                    lastFen,
                    side: mySide,
                    whiteTimeLeft: mySide === 'white' ? get().myTimeLeft : get().opponentTimeLeft,
                    blackTimeLeft: mySide === 'black' ? get().myTimeLeft : get().opponentTimeLeft,
                } as IMoveState;

                socket.emit('game:move', moveState);
            }
        },

        onOpponentMove(moveState) {
            get().chess.move(moveState.movement);
            set({
                isMyTurn: true,
                gamePosition: get().chess.fen(),
            })
        },

        onMyTimeChange() {
            const currentTimeLeft = get().myTimeLeft;
            if (currentTimeLeft == 0) {
                get().onGameOver(get().mySide === 'white' ? 'black' : 'white', 'timeout')
                return;
            }
            set({
                myTimeLeft: currentTimeLeft - 1,
            });
        },

        onOpponentTimeChange() {
            const currentTimeLeft = get().opponentTimeLeft;
            if (currentTimeLeft == 0) {
                get().onGameOver(get().mySide === 'white' ? 'white' : 'black', 'timeout')
                return;
            }
            set({
                opponentTimeLeft: currentTimeLeft - 1,
            });
        },

        onGameOver(winner, reason) {
            set({
                isGameOver: true,
                gameOverReason: `${lcFirst(winner)} won! ${gameOverLabels[reason]}`,
            })

            const gameOverState = {
                winner,
                reason,
                whiteTimeLeft: get().mySide === 'white' ? get().myTimeLeft : get().opponentTimeLeft,
                blackTimeLeft: get().mySide === 'black' ? get().myTimeLeft : get().opponentTimeLeft,
            } as IGameOverState;

            socket.emit('game:over', gameOverState);
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