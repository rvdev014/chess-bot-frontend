import React from 'react';
import styles from "./styles.module.scss";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {shallow} from "zustand/shallow";
import {CreateRoomModal} from "../../../features/create-room-modal/ui";
import {GameOptionsModal} from "../../../features/game-options-modal/ui";
import {MyButton} from "../../../shared/ui/my-button";

export const LocalLobby = () => {

    const [
        onPlayWithFriend,
        onPlayWithRobot,
    ] = useLobbyStore(state => [
        state.onPlayWithFriend,
        state.onPlayWithRobot,
    ], shallow);

    return (
        <>

            <div className={styles.lobbyWrapper}>
                <h1 className='title'>Выбрать игру</h1>
                <MyButton size='md' className={styles.btn} onClick={onPlayWithFriend}>
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