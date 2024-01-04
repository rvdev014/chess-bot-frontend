import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {MyButton} from "../../../shared/ui/my-button";
import {FaEye} from "react-icons/fa";
import {Modal} from "@mantine/core";
import {IoHome} from "react-icons/io5";
import {gameOverLabels} from "../../game-panel/model/utils.ts";
import {GameOverReasonType, SideType} from "../../../shared/model/game/store-types.ts";
import {lcFirst} from "../../../shared/utils.ts";

interface IProps {
    winner: SideType | null;
    gameOverReason: GameOverReasonType | null;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    onViewMode: () => void;
    onHomeClick: () => void;
}

export const GameOverPopup: FC<IProps> = ({winner, gameOverReason, isOpen, setOpen, ...props}) => {

    function getReasonLabel() {
        return gameOverReason ? gameOverLabels[gameOverReason] : 'Game Over';
    }

    function getWinner() {
        return winner ? `${lcFirst(winner)} won` : 'Draw';
    }

    return (
        <Modal
            // title={gameOverReason ?? 'Game Over'}
            opened={isOpen}
            onClose={() => setOpen(false)}
            transitionProps={{transition: 'fade', duration: 200}}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            size={'xs'}
            withCloseButton={false}
            centered
        >
            <div className={styles.gameOverModal}>
                <p className={styles.title}>{getReasonLabel()}</p>
                <p className={styles.text}>{getWinner()}</p>
                <div className={styles.buttonsBlock}>
                    <MyButton className={styles.viewBtn} onClick={props.onHomeClick}>
                        <IoHome/>
                    </MyButton>
                    <MyButton className={styles.viewBtn} onClick={props.onViewMode}>
                        <FaEye/>
                    </MyButton>
                </div>
            </div>
        </Modal>
    );
};