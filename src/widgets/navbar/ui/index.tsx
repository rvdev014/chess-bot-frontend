import React, {FC} from 'react';
import styles from './styles.module.scss';
import {Button} from "@mantine/core";
import {IoHome} from "react-icons/io5";
import {NavbarButtonsType} from "../../../shared/model/app-store-types.ts";
import {AiOutlineFullscreen, AiOutlineFullscreenExit} from "react-icons/ai";

interface IProps {
    buttons: NavbarButtonsType[]
}

export const Navbar: FC<IProps> = ({buttons}) => {

    const [isFullscreen, setIsFullscreen] = React.useState(false);

    const onFullscreenChange = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }

    return (
        <div className={styles.header}>
            {buttons.includes('home') &&
                <Button
                    size={'md'}
                    className={styles.mainBtn}
                >
                    <IoHome className={styles.mainIcon}/>
                </Button>}

            {buttons.includes('fullscreen') &&
                <Button
                    size={'md'}
                    className={styles.mainBtn}
                    onClick={onFullscreenChange}
                >
                    {isFullscreen
                        ? <AiOutlineFullscreenExit className={styles.mainIcon}/>
                        : <AiOutlineFullscreen className={styles.mainIcon}/>}
                </Button>}
        </div>
    );
};