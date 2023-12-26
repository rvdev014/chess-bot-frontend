import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RobotPage} from "../pages/robot";
import {HomePage} from "../pages/home";
import {GuestGamePage} from "../pages/guest";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/game/:room" element={<GuestGamePage/>}/>
                <Route path="/robot" element={<RobotPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;