import {create} from "zustand";
import {ILobbyStore} from "./store-types.ts";
import {socket} from "../../api/socket.ts";
import {IGameOptions} from "../game/store-types.ts";
import {history} from "../../../app/router/router-history.ts";

const initialStore = {
    isSearching: false,
    isCreateRoomModal: false,
} as ILobbyStore;

export const useLobbyStore = create<ILobbyStore>((set, get) => {
    return {
        ...initialStore,
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


    }
})