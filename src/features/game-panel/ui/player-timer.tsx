import React, {FC} from 'react';
import {useGameStore} from "../../../shared/model/game/store.ts";
import {Timer} from "../../timer";
import {SideType} from "../../../shared/model/game/store-types.ts";

interface IProps {
    side: SideType;
}

export const PlayerTimer: FC<IProps> = ({side}) => {

    const mySide = useGameStore(state => state.mySide);
    const isMyTurn = useGameStore(state => state.isMyTurn);
    const isGameOver = useGameStore(state => state.isGameOver);
    const myTimeLeft = useGameStore(state => state.myTimeLeft);
    const opponentTimeLeft = useGameStore(state => state.opponentTimeLeft);
    const onMyTimeChange = useGameStore(state => state.onMyTimeChange);
    const onOpponentTimeChange = useGameStore(state => state.onOpponentTimeChange);

    function getIsRunning() {
        if (isGameOver) {
            return false;
        }

        if (isMyTurn) {
            return side === mySide;
        } else {
            return side !== mySide;
        }
    }

    return (
        <Timer
            isRunning={getIsRunning()}
            timeLeft={side === mySide ? myTimeLeft : opponentTimeLeft}
            onTimeChange={side === mySide ? onMyTimeChange : onOpponentTimeChange}
            type={side === mySide ? 'bottom' : 'top'}
            // username={side === mySide ? 'You' : 'Opponent'}
        />
    );
};