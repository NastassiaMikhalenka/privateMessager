import React, {createContext, useEffect, useState} from 'react';
import styles from './home.module.css';
import {Sidebar} from "./sidebar";
import {Chat} from "./chat";
import useSocket from "./useSocket";

export const FriendsContext = createContext()
export const MessagesContext = createContext()

export const Home = () => {

    const [friendsList, setFriendsList] = useState([])
    const [messages, setMessages] = useState([])
    const [friendIndex, setFriendIndex] = useState('')
    console.log(friendIndex)

    useSocket(setFriendsList, setMessages)

    return (
        <FriendsContext.Provider value={{friendsList, setFriendsList}}>
            <div className={styles.homeContainer}>
                {/*<div className={styles.sideBar}>*/}
                    <Sidebar setFriendIndex={setFriendIndex}/>
                {/*</div>*/}
                <div className={styles.chatMessagerContainer}>
                    <MessagesContext.Provider value={{messages, setMessages}}>
                    <Chat friendIndex={friendIndex}/>
                    </MessagesContext.Provider>
                </div>
            </div>
        </FriendsContext.Provider>

    )
}