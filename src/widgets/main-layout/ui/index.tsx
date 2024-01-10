import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Navbar} from "../../navbar";
import {Outlet} from "react-router-dom";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {Loader} from "@mantine/core";
import {UI_COLOR} from "../../../shared/consts.ts";

export const MainLayout = () => {

    const isAppLoading = useAppStore(state => state.isAppLoading)
    const initTelegram = useAppStore(state => state.initTelegram)

    useEffect(() => {
        initTelegram();
    }, [])

    if (isAppLoading) {
        return (
            <div className='AppLoader'>
                <Loader size='xl' color={UI_COLOR}/>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    );
};