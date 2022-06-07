import React, {useContext, useState} from 'react';
// import styles from './home.module.css';
import {FriendsContext} from "./home";
import Modal from "../modal/modal";
import styles from "./sidebar.module.css";


export const Sidebar = ({setFriendIndex}) => {
    const {friendsList, setFriendsList} = useContext(FriendsContext)
    const [isShownModal, setIsShownModal] = useState(false)

    const closeModal = () => setIsShownModal(false)
    const showModal = () => {
        setIsShownModal(true)
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.sideBarHeader}>
                <p className={styles.sideBarHeaderText}>Add friend</p>
                <div>
                    <button className={styles.sideBarBtn} onClick={() => showModal()}>+</button>
                </div>
            </div>
            <div className={styles.friendsListHeader}>
                {
                    friendsList.map((friend, index) => {
                        return (
                            <div key={`${friend.username}${friend.userid}`} className={styles.containerUser}
                                 onClick={() => setFriendIndex(index)}>
                                <div className={styles.avatarContainer}>
                                    <div className={styles.avatar}>{friend.username[0]}</div>
                                    <div className={friend.connected ? `${styles.online}` : `${styles.offline}`}></div>
                                </div>
                                <div className={styles.name}>{friend.username}</div>
                            </div>
                        )
                    })
                }
            </div>
            <Modal show={isShownModal} closeModal={closeModal}/>
        </div>
    )
}