import React, {useContext} from 'react';
import styles from './home.module.css';
import {FriendsContext} from "./home";

export const Chat = () => {
    const {friendsList} = useContext(FriendsContext)

    return friendsList.length > 0 ?(
        <>
            <div>Chat</div>
        </>
    ) : (
        <div>
            No friends. Click add friend to start chatting
        </div>
    )
}