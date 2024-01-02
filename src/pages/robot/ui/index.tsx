import React from 'react';
import {MyChessboardClickable} from "../../../widgets/my-chessboard";
import {RobotGamePanel} from "../../../features/game-panel/ui/robot.tsx";

export const RobotPage = () => {
    return (
        <div>
            <h1 className='title'>Player vs Robot</h1>
            <RobotGamePanel/>
        </div>
    );
};