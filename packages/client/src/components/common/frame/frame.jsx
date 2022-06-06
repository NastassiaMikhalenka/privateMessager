import React from 'react';
import styles from './frame.module.css';


export const Frame = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.frame}>
                {props.children}
            </div>
        </div>
    );
};