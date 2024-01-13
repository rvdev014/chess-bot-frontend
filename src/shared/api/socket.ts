import {io} from 'socket.io-client';
import {API_URL, SOCKET_PATH} from "../consts.ts";

export const socket = io(API_URL, {
    path: SOCKET_PATH,
});
socket.on('connect_error', (error: any) => {
    console.error('connect_error', error)
})