import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RobotPage} from "../pages/robot";
import {HomeLobby} from "../pages/home";
import {GuestGamePage} from "../pages/guest";
import {CustomRouter} from "./router/custom-router.tsx";
import {history} from "./router/router-history.ts";
import {FriendGamePage} from "../pages/friend/ui";
import {MainLayout} from "../widgets/main-layout";

const Routing = () => {
    return (
        <CustomRouter history={history}>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<HomeLobby/>}/>
                    <Route path="/guest/:room" element={<GuestGamePage/>}/>
                    <Route path="/friend/:room" element={<FriendGamePage/>}/>
                    <Route path="/robot" element={<RobotPage/>}/>
                </Route>
            </Routes>
        </CustomRouter>
    );
};

export default Routing;