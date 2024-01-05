import {create} from "zustand";
import {ILobbyStore} from "./store-types.ts";
import {socket} from "../../api/socket.ts";
import {IGameOptions} from "../game/store-types.ts";
import {history} from "../../../app/router/router-history.ts";
import {useGameStore} from "../game/store.ts";
import {openConfirm} from "../../utils.ts";

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
            if (useGameStore.getState().isGameStarted) {
                openConfirm('Вы хотите покинуть игру?', () => {
                    socket.emit('game:leave');
                    get().reset();
                    useGameStore.getState().reset();
                    history.push('/');
                });
            } else {
                get().reset();
            }
        },

        onSearchOpponent() {
            set({isSearching: true});
            socket.emit('game:search');
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
            socket.emit('game:create-room-cancel');
            set({isWaitingFriend: false});
        },

        onCloseCreateRoomModal() {
            set({isCreateRoomModal: false});
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