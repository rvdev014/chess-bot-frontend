import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {MyButton} from "../../../shared/ui/my-button";
import {FaEye} from "react-icons/fa";
import {Modal} from "@mantine/core";
import {IoHome} from "react-icons/io5";
import {gameOverLabels} from "../../game-panel/model/utils.ts";
import {GameOverReasonType, SideType} from "../../../shared/model/game/store-types.ts";
import {GiChessQueen} from "react-icons/gi";
import {formatTime} from "../../timer/model/utils.ts";

interface IProps {
    winner: SideType | null;
    whiteTimeLeft: number;
    blackTimeLeft: number;
    whitePlayerName?: string;
    blackPlayerName?: string;
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
        return winner ? `${winner === 'black' ? 'Чёрный' : 'Белый'} победил` : 'Ничья';
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
            closeOnClickOutside={false}
            centered
        >
            <div className={styles.gameOverModal}>
                <p className={styles.title}>{getReasonLabel()}</p>
                <p className={styles.text}>{getWinner()}</p>
                <div className={styles.playersBlock}>
                    <div className={styles.playerRow}>
                        <div className={styles.playerLeft}>
                            <div className={styles.chessIconWrapper}>
                                <GiChessQueen className={`${styles.chessIcon} ${styles.whiteChessIcon}`}/>
                            </div>
                            <span className={styles.playerName}>{props.whitePlayerName}</span>
                        </div>
                        <span className={styles.time}>{formatTime(props.whiteTimeLeft)}</span>
                    </div>
                    <div className={styles.playerRow}>
                        <div className={styles.playerLeft}>
                            <div className={styles.chessIconWrapper}>
                                <GiChessQueen className={styles.chessIcon}/>
                            </div>
                            <span className={styles.playerName}>{props.blackPlayerName}</span>
                        </div>
                        <span className={styles.time}>{formatTime(props.blackTimeLeft)}</span>
                    </div>
                </div>
                <div className={styles.buttonsBlock}>
                    <MyButton className={styles.viewBtn} onClick={props.onHomeClick}>
                        <IoHome className='mainIcon'/>
                    </MyButton>
                    <MyButton className={styles.viewBtn} onClick={props.onViewMode}>
                        <FaEye className='mainIcon'/>
                    </MyButton>
                </div>
            </div>
        </Modal>
    );
};