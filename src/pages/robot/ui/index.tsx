import React from 'react';
import {MyChessboardClickable} from "../../../widgets/my-chessboard";

export const RobotPage = () => {
    return (
        <div>
            <h1 className='title'>Player vs Robot</h1>
            <MyChessboardClickable isRobot={true}/>
        </div>
    );
};