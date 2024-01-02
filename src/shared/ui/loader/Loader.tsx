import React, {FC} from 'react';
import './loader.scss';
import styles from "./styles.module.scss";

interface IProps {
    onCancel: () => void;
}

export const Loader: FC<IProps> = ({onCancel}) => {
    return (
        <>
            <div className={styles.searchWrapper}>
                <div className="loader loader-1">
                    <div className="loader-outter"></div>
                    <div className="loader-inner"></div>
                </div>
                <button className={styles.btn} onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </>
    );
};
