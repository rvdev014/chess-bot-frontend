import {GameOverReasonType} from "../../../shared/model/game/store-types.ts";

export const gameOverLabels: {[key in GameOverReasonType]: string} = {
    'checkmate': 'Checkmate',
    'draw': 'Draw',
    'timeout': 'Time\'s up',
    'resign': 'Resign',
    'disconnect': 'Opponent disconnected',
}