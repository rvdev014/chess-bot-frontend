import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GamePage} from "../pages/game";
import {HomePage} from "../pages/home";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/game/:room" element={<GamePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;