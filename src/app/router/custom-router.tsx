import {Router} from "react-router-dom";
import React, {FC, useLayoutEffect, useState} from "react";
import {BrowserHistory} from "history";

interface IProps {
    history: BrowserHistory;
    children: React.ReactNode
}

export const CustomRouter: FC<IProps> = ({ history, ...props }) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            {...props}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};