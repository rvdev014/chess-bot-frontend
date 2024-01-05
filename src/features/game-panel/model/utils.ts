import {GameOverReasonType} from "../../../shared/model/game/store-types.ts";

export const gameOverLabels: {[key in GameOverReasonType]: string} = {
    'checkmate': 'Шах и мат',
    'draw': 'Ничья',
    'timeout': 'Время вышло',
    'resign': 'Соперник сдался',
    'disconnect': 'Соперник отключился',
}