import React from 'react';
import styles from './styles.module.scss';
import {Modal} from "@mantine/core";
import {IoHome} from "react-icons/io5";
import {AiOutlineFullscreen, AiOutlineFullscreenExit} from "react-icons/ai";
import {MdInfoOutline} from "react-icons/md";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {useGameStore} from "../../../shared/model/game/store.ts";
import {shallow} from "zustand/shallow";
import {IoMdShare} from "react-icons/io";
import {MyButton} from "../../../shared/ui/my-button";
import {useGuestGameStore} from "../../../shared/model/guest-game/store.ts";

export const Navbar = () => {

    // get location from store
    const isGameFound = useGuestGameStore(state => state.isGameFound);

    const [
        isPlayingLocal,
        onHomeClick
    ] = useLobbyStore(state => [
        state.isPlayingLocal,
        state.onHomeClick
    ], shallow);

    const [
        isGameStarted,
        roomId,
        onShareClick
    ] = useGameStore(state => [
        state.isGameStarted,
        state.roomId,
        state.onShareClick
    ], shallow);

    const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    function getIsHome() {
        return isPlayingLocal || isGameStarted || isGameFound;
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
        return !!roomId;
    }

    return (
        <>
            <div className={styles.header}>
                <div>
                    {getIsHome() &&
                        <MyButton className={styles.mainBtn} onClick={onHomeClick}>
                            <IoHome className='mainIcon'/>
                        </MyButton>}
                </div>

                <div>

                    {getIsShare() &&
                        <MyButton className={styles.mainBtn} onClick={onShareClick}>
                            <IoMdShare className='mainIcon'/>
                        </MyButton>}

                    <MyButton className={styles.mainBtn} onClick={onInfoClick}>
                        <MdInfoOutline className='mainIcon'/>
                    </MyButton>

                    <MyButton className={styles.mainBtn} onClick={onFullscreenClick}>
                        {isFullscreen
                            ? <AiOutlineFullscreenExit className='mainIcon'/>
                            : <AiOutlineFullscreen className='mainIcon'/>}
                    </MyButton>
                </div>
            </div>

            {isInfoModalOpen &&
                <Modal
                    opened={isInfoModalOpen}
                    onClose={onInfoModalClose}
                    title={'About Let\'s Chess'}
                    size={'sm'}
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