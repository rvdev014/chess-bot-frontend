import React from 'react';
import styles from './styles.module.scss';
import {Navbar} from "../../navbar";
import {Outlet} from "react-router-dom";
import {useAppStore} from "../../../shared/model/app-store.ts";

export const MainLayout = () => {

    const navbarButtons = useAppStore(state => state.navbarButtons);

    return (
        <div className={styles.wrapper}>
            <Navbar buttons={navbarButtons}/>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    );
};