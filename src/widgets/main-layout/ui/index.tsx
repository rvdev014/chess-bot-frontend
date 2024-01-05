import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Navbar} from "../../navbar";
import {Outlet} from "react-router-dom";
import {useAppStore} from "../../../shared/model/app-store.ts";

export const MainLayout = () => {

    const initTelegram = useAppStore(state => state.initTelegram)

    useEffect(() => {
        initTelegram();
    }, [])

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    );
};