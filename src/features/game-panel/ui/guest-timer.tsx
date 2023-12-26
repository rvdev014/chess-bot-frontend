import React, {FC} from 'react';
import {Timer} from "../../timer";
import {useGuestGameStore} from "../../../shared/model/guest-game/store.ts";
import {SideType} from "../../../shared/model/game/store-types.ts";

interface IProps {
    side: SideType;
    type?: 'top' | 'bottom';
}

export const GuestTimer: FC<IProps> = ({side, ...props}) => {

    const isGameOver = useGuestGameStore(state => state.isGameOver);
    const currentTurn = useGuestGameStore(state => state.currentTurn);
    const whiteTimeLeft = useGuestGameStore(state => state.whiteTimeLeft);
    const blackTimeLeft = useGuestGameStore(state => state.blackTimeLeft);
    const onTimeChange = useGuestGameStore(state => state.onTimeChange);

    function getTimeLeft() {
        return side === 'white' ? whiteTimeLeft : blackTimeLeft
    }

    return (
        <Timer
            isRunning={!!getTimeLeft() && !isGameOver && (currentTurn === side)}
            timeLeft={side === 'white' ? whiteTimeLeft : blackTimeLeft}
            onTimeChange={() => onTimeChange(side)}
            type={props.type}
        />
    );
};