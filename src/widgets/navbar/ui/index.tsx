import React from 'react';
import styles from './styles.module.scss';
import {Button, Modal} from "@mantine/core";
import {IoHome} from "react-icons/io5";
import {AiOutlineFullscreen, AiOutlineFullscreenExit} from "react-icons/ai";
import {MdInfoOutline} from "react-icons/md";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {useGameStore} from "../../../shared/model/game/store.ts";
import {shallow} from "zustand/shallow";
import {IoMdShare} from "react-icons/io";

export const Navbar = () => {

    const [
        isPlayingLocal,
        onHomeClick
    ] = useLobbyStore(state => [
        state.isPlayingLocal,
        state.onHomeClick
    ], shallow);

    const [
        isGameStarted,
        opponent,
        onShareClick
    ] = useGameStore(state => [
        state.isGameStarted,
        state.opponent,
        state.onShareClick
    ], shallow);

    const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    function getIsHome() {
        return isPlayingLocal || isGameStarted;
    }

    function onInfoClick() {
        setIsInfoModalOpen(true);
    }

    function onInfoModalClose() {
        setIsInfoModalOpen(false);
    }

    function onFullscreenClick() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }

    function getIsShare() {
        return !!opponent;
    }

    return (
        <>
            <div className={styles.header}>
                <div>
                    {getIsHome() &&
                        <Button
                            size={'md'}
                            className={styles.mainBtn}
                            onClick={onHomeClick}
                            color='#b58863'
                        >
                            <IoHome className={styles.mainIcon}/>
                        </Button>}
                </div>

                <div>

                    {getIsShare() &&
                        <Button
                            size={'md'}
                            className={styles.mainBtn}
                            onClick={onShareClick}
                            color='#b58863'
                        >
                            <IoMdShare className={styles.mainIcon}/>
                        </Button>}

                    <Button
                        size={'md'}
                        className={styles.mainBtn}
                        onClick={onInfoClick}
                        color='#b58863'
                    >
                        <MdInfoOutline className={styles.mainIcon}/>
                    </Button>

                    <Button
                        size={'md'}
                        className={styles.mainBtn}
                        onClick={onFullscreenClick}
                        color='#b58863'
                    >
                        {isFullscreen
                            ? <AiOutlineFullscreenExit className={styles.mainIcon}/>
                            : <AiOutlineFullscreen className={styles.mainIcon}/>}
                    </Button>
                </div>
            </div>

            {isInfoModalOpen &&
                <Modal
                    opened={isInfoModalOpen}
                    onClose={onInfoModalClose}
                    title={'About Let\'s Chess'}
                    size={'md'}
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                    closeOnClickOutside={false}
                >
                    <div className={styles.infoModal}>
                        <p>Developed by <a target='_blank' href="https://t.me/morris_admin">Morris</a></p>
                    </div>
                </Modal>}
        </>
    );
};