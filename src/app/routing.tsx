import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RobotPage} from "../pages/robot";
import {GamePage} from "../pages/game";
import {HomePage} from "../pages/home";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/game/:room" element={<GamePage/>}/>
                <Route path="/robot" element={<RobotPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;