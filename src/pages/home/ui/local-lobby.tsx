import React from 'react';
import styles from "./styles.module.scss";
import {useLobbyStore} from "../../../shared/model/lobby/store.ts";
import {shallow} from "zustand/shallow";
import {CreateRoomModal} from "../../../features/create-room-modal/ui";
import {GameOptionsModal} from "../../../features/game-options-modal/ui";
import {Button} from "@mantine/core";

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
                <h1 className='title'>Game mode</h1>
                <Button color='#b58863' size={'md'} className={styles.btn} onClick={onPlayWithFriend}>
                    Играть с другом
                </Button>
                <Button color='#b58863' size={'md'} className={styles.btn} onClick={onPlayWithRobot}>
                    Играть с роботом
                </Button>
            </div>

            <CreateRoomModal/>

            <GameOptionsModal/>

        </>
    );
};