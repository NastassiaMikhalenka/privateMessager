import React, {createContext, useEffect, useState} from 'react';
import styles from './home.module.css';
import {Sidebar} from "./sidebar/sidebar";
import {Chat} from "./chat/chat";
import useSocket from "./useSocket";

export const FriendsContext = createContext()
export const MessagesContext = createContext()

export const Home = () => {

    const [friendsList, setFriendsList] = useState([])
    const [messages, setMessages] = useState([])
    const [friendIndex, setFriendIndex] = useState(0)

    useSocket(setFriendsList, setMessages)
    console.log(`${process.env.REACT_APP_SERVER_URL}`)

    return (
        <FriendsContext.Provider value={{friendsList, setFriendsList}}>
            <div className={styles.homeContainer}>
                <Sidebar setFriendIndex={setFriendIndex}/>
                <MessagesContext.Provider value={{messages, setMessages}}>
                    <Chat userid={friendsList[friendIndex]?.userid} friendIndex={friendIndex}/>
                </MessagesContext.Provider>
            </div>
        </FriendsContext.Provider>

    )
}