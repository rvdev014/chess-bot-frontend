import React, {FC} from 'react';
import styles from "./styles.module.scss";

interface IProps {
    children?: React.ReactNode;
    onCancel: () => void;
}

export const Loader: FC<IProps> = ({children, onCancel}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loaderWrapper}>
                <div className={`${styles.loader} ${styles.loader1}`}>
                    <div className={styles.loaderOutter}></div>
                    <div className={styles.loaderInner}></div>
                </div>
            </div>
            <button className={styles.btn} onClick={onCancel}>
                Cancel
            </button>
        </div>
    );
};