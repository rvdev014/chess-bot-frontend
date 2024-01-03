import React from 'react';
import styles from './styles.module.scss';
import {Navbar} from "../../navbar";
import {Outlet} from "react-router-dom";

export const MainLayout = () => {

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    );
};