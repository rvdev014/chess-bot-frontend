import {create} from "zustand";
import {IGameOptions, IGameOverState, IGameStore, IMoveState} from "./store-types.ts";
import {socket} from "../../api/socket.ts";
import {Chess, PieceSymbol} from "chess.ts";
import {Engine} from "../../../widgets/my-chessboard/model/engine.ts";
import {useLobbyStore} from "../lobby/store.ts";
import {apiInstance} from "../../api/axios.ts";
import {MainApi} from "../../api/main-api.ts";
import {notifications} from "@mantine/notifications";
import {useAppStore} from "../app-store.ts";

const defaultTimeLimit = 60 * 15;
const defaultRobotLevel = 1;

const initialStore = {
    isGameStarted: false,
    chess: new Chess(),
    engine: new Engine(),
    gamePosition: undefined,
    opponent: null,
    isGameOver: false,
    gameOverReason: null,
    roomId: null,
    timeLimit: defaultTimeLimit,
    myTimeLeft: defaultTimeLimit,
    opponentTimeLeft: defaultTimeLimit,
} as IGameStore;

export const useGameStore = create<IGameStore>((set, get) => {
    return {
        ...initialStore,

        setGameOverPopup(isGameOverPopup) {
            set({isGameOverPopup});
        },

        onConnect() {
            console.log('Connected')
        },

        initGame(isRobot = false) {
            const newChess = new Chess();
            let timeLimit = defaultTimeLimit;
            const gameOptions: IGameOptions = JSON.parse(localStorage.getItem('gameOptions') || '{}');
            if (isRobot && gameOptions.timeLimit) {
                timeLimit = gameOptions.timeLimit * 60;
            }

            set({
                isGameStarted: true,
                chess: newChess,
                engine: new Engine(),
                gamePosition: newChess.fen(),
                isRobot,
                timeLimit,
                myTimeLeft: timeLimit,
                opponentTimeLeft: timeLimit,
                robotLevel: gameOptions.robotLevel || defaultRobotLevel,
                isGameOver: false,
                isGameOverPopup: false,
                gameOverReason: null,
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

        async onGameStarted(opponent, mySide, roomId) {
            useLobbyStore.getState().onCancelSearch();
            try {
                console.log('opponent', opponent)
                const userOpponent = await MainApi.getUser(opponent.userId);
                // only 15 minutes for online plays
                const timeLimit = 15 * 60;
                set({
                    mySide,
                    roomId,
                    timeLimit,
                    myTimeLeft: timeLimit,
                    opponentTimeLeft: timeLimit,
                    opponent: userOpponent,
                    isMyTurn: mySide === 'white',
                });
            } catch (e) {
                console.log(e);
            }
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
            console.log('Opponent move')
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
            set({myTimeLeft: currentTimeLeft - 1});
        },

        onOpponentTimeChange() {
            const currentTimeLeft = get().opponentTimeLeft;
            if (currentTimeLeft == 0) {
                get().onGameOver(get().mySide === 'white' ? 'white' : 'black', 'timeout')
                return;
            }
            set({opponentTimeLeft: currentTimeLeft - 1});
        },

        onGameOver(winner, reason) {
            console.log('asdadsasdds')
            set({
                isGameOver: true,
                isGameOverPopup: true,
                winner,
                gameOverReason: reason
            })

            const gameOverState = {
                winner,
                reason,
                whiteTimeLeft: get().mySide === 'white' ? get().myTimeLeft : get().opponentTimeLeft,
                blackTimeLeft: get().mySide === 'black' ? get().myTimeLeft : get().opponentTimeLeft,
            } as IGameOverState;

            socket.emit('game:over', gameOverState);
        },

        onViewClick() {
            set({isGameOverPopup: false});
        },

        async onShareFriend(friendIds) {
            try {
                const roomId = get().roomId;
                const me = useAppStore.getState().me || {user_id: 355919981};
                const inviteUrl = `http://localhost:5173/guest/${roomId}`;
                const response = await apiInstance.post(`/user/${me?.user_id}/share`, {
                    inviteUrl,
                    friendIds
                })
                /*notifications.show({
                    title: 'Успешно',
                    message: 'Ссылка отправлена друзьям',
                })*/
            } catch (e: any) {
                console.log(e);
                /*notifications.show({
                    title: e?.response?.code,
                    message: 'Ошибка при отправке приглашения',
                })*/
            }
        },

        onShareClick() {
            /*const roomId = get().roomId;
            const url = `http://localhost:5173/guest/${roomId}`;
            navigator.clipboard.writeText(url).then(() => {
                alert('Copied to clipboard');
            });*/
            set({isSharePopup: true});
        },

        setSharePopup(isSharePopup) {
            set({isSharePopup});
        },

        onOpponentDisconnected() {
            console.log('Opponent disconnected')
            get().onGameOver(get().mySide === 'white' ? 'white' : 'black', 'disconnect')
        },

        resetGame() {
            get().engine.stop();
            const newChess = new Chess();
            set({
                chess: newChess,
                engine: new Engine(),
                gamePosition: newChess.fen(),
                isGameStarted: false,
            });
        },

        reset() {
            get().engine.stop();
            set(initialStore);
        },

        onDisconnect() {
            console.log('Disconnected')
            socket.disconnect();
        },
    };
});