import React, {useEffect} from 'react';
import styles from "./styles.module.scss";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {shallow} from "zustand/shallow";
import {CreateRoomModal} from "../../../features/create-room-modal/ui";
import {GameOptionsModal} from "../../../features/game-options-modal/ui";
import {MyButton} from "../../../shared/ui/my-button";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {socket} from "../../../shared/api/socket.ts";
import {Input, Modal} from "@mantine/core";
import {FaCopy} from "react-icons/fa";

export const LocalLobby = () => {

    const me = useAppStore(state => state.me);

    const [
        onPlayWithFriend,
        onPlayWithRobot,
        onRoomCreated,
    ] = useLobbyStore(state => [
        state.onPlayWithFriend,
        state.onPlayWithRobot,
        state.onRoomCreated,
    ], shallow);

    useEffect(() => {
        socket.on('game:room-created', onRoomCreated);
    }, []);

    return (
        <>

            <div className={styles.lobbyWrapper}>
                <h1 className='title'>Выбрать игру</h1>
                <MyButton
                    size='md'
                    className={styles.btn}
                    onClick={onPlayWithFriend}
                    // disabled={!me}
                >
                    Играть с другом
                </MyButton>
                <MyButton size='md' className={styles.btn} onClick={onPlayWithRobot}>
                    Играть с роботом
                </MyButton>
            </div>

            <CreateRoomModal/>

            <GameOptionsModal/>

        </>
    );
};