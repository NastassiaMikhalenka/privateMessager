import React, {createContext, useState} from 'react';
import styles from './home.module.css';
import {Sidebar} from "./sidebar";
import {Chat} from "./chat";
import useSocket from "./useSocket";

export const FriendsContext = createContext()

export const Home = () => {

    const [friendsList, setFriendsList] = useState([])
    console.log(friendsList)
    useSocket(setFriendsList)

    return (
        <FriendsContext.Provider value={{friendsList, setFriendsList}}>
            <div className={styles.homeContainer}>
                <div className={styles.sideBar}>
                    <Sidebar/>
                </div>
                <div>
                    <Chat/>
                </div>
            </div>
        </FriendsContext.Provider>

    )
}