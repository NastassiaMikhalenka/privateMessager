import React, {useContext, useState} from 'react';
import styles from './home.module.css';
import {FriendsContext} from "./home";
import Modal from "../modal/modal";

export const Sidebar = () => {
    const {friendsList, setFriendsList} = useContext(FriendsContext)
    const [isShownModal, setIsShownModal] = useState(false)

    const closeModal = () => setIsShownModal(false)
    const showModal = () => {
        setIsShownModal(true)
    }

    return (
        <>
            <div className={styles.sideBarHeader}>
                <p>Add friend</p>
                <button className={styles.sideBarBtn} onClick={() => showModal()}>BTN ADD</button>
            </div>
            <div>
                {
                    friendsList.map(friend => {
                        return (
                            <div className={styles.containerUser}>
                                {/*<div className={friend.connected ? `${styles.online}` : `${styles.offline}`}></div>*/}
                                <div className={styles.name}>{friend}</div>
                            </div>
                        )
                    })
                }
            </div>
            <Modal show={isShownModal} closeModal={closeModal}/>
        </>
    )
}