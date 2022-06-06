import React, {useContext, useState} from 'react';
import styles from './home.module.css';
import {FriendsContext} from "./home";
import Modal from "../modal/modal";



export const Sidebar = ({setFriendIndex}) => {
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
            {/*<VStack as={TabList}>*/}
            {/*    {friendList.map(friend => (*/}
            {/*        <HStack as={Tab} key={`friend:${friend}`}>*/}
            {/*            <Circle*/}
            {/*                bg={*/}
            {/*                    "" + friend.connected === "true" ? "green.700" : "red.500"*/}
            {/*                }*/}
            {/*                w="20px"*/}
            {/*                h="20px"*/}
            {/*            />*/}
            {/*            <Text>{friend.username}</Text>*/}
            {/*        </HStack>*/}
            {/*    ))}*/}
            {/*</VStack>*/}
             <div>
                 {
                    friendsList.map(friend => {
                        return (
                            <div className={styles.containerUser} onClick={() => setFriendIndex(friend.userid)}>
                                <div className={friend.connected ? `${styles.online}` : `${styles.offline}`}></div>
                                <div className={styles.name}>{friend.username}</div>
                            </div>
                        )
                    })
                }
            </div>
            <Modal show={isShownModal} closeModal={closeModal}/>
        </>
    )
}