import {io} from 'socket.io-client';
import {API_URL} from "../consts.ts";

export const socket = io(API_URL);
socket.on('connect_error', (error: any) => {

})