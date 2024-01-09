import {create} from "zustand";
import {ILobbyStore} from "./store-types.ts";
import {socket} from "../../api/socket.ts";
import {IGameOptions} from "../game/store-types.ts";
import {history} from "../../../app/router/router-history.ts";
import {useGameStore} from "../game/store.ts";
import {openConfirm} from "../../utils.ts";
import {useAppStore} from "../app-store.ts";
import {useGuestGameStore} from "../guest-game/store.ts";

const initialStore = {
    isWaitingFriend: false,
    isFriendFound: false,
    isSearching: false,
    isCreateRoomModal: false,
    isGameOptionsModal: false,
    isPlayingLocal: false,
} as ILobbyStore;

export const useLobbyStore = create<ILobbyStore>((set, get) => {
    return {
        ...initialStore,

        onHomeClick() {
            if (useGameStore.getState().isGameStarted && !useGameStore.getState().isGameOver) {
                openConfirm('Вы хотите покинуть игру?', () => {
                    socket.emit('game:leave');
                    useGameStore.getState().reset();
                    get().reset();
                    history.push('/');
                });
            } else if (useGuestGameStore.getState().isGameFound && !useGuestGameStore.getState().isGameOver) {
                openConfirm('Вы хотите покинуть игру?', () => {
                    socket.emit('game:leave');
                    useGuestGameStore.getState().resetGuestGame();
                    get().reset();
                    history.push('/');
                });
            } else {
                socket.emit('game:leave');
                useGameStore.getState().reset();
                useGuestGameStore.getState().resetGuestGame();
                get().reset();
                history.push('/');
            }

        },

        onSearchOpponent() {
            const me = useAppStore.getState().me;
            set({isSearching: true});
            socket.emit('game:search', me?.user_id);
        },

        onPlayLocal() {
            set({isPlayingLocal: true});
        },

        onSubmitCreateRoomForm(fields) {
            set({
                isCreateRoomModal: false,
                isWaitingFriend: true,
            })
            socket.emit('game:create-room', fields);
        },

        onSubmitGameOptionsForm(fields) {
            const gameOptions: IGameOptions = {
                timeLimit: fields.time,
                robotLevel: fields.level,
            }
            localStorage.setItem('gameOptions', JSON.stringify(gameOptions));
            history.push('/robot');
        },

        onCancelSearch() {
            set({isSearching: false});
            socket.emit('game:search-cancel');
        },

        onConnect() {
            console.log('Connected')
        },

        onDisconnect() {
            console.log('Disconnected')
        },

        onPlayWithFriend() {
            set({isCreateRoomModal: true});
        },

        onCancelWaitingFriend() {
            set({isWaitingFriend: false})
            socket.emit('game:create-room-cancel');
        },

        onCloseCreateRoomModal() {
            set({isCreateRoomModal: false});
        },

        onRoomCreated(inviteUrl) {
            set({inviteUrl});
        },

        onPlayWithRobot() {
            set({isGameOptionsModal: true});
        },

        onCloseGameOptionsModal() {
            set({isGameOptionsModal: false});
        },

        reset() {
            set(initialStore);
        }
    }
})