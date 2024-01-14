import {io} from 'socket.io-client';
import {SOCKET_URL} from "../consts.ts";

export const socket = io(SOCKET_URL);

socket.on('connect_error', (error: any) => {
    console.error('connect_error', error)
})