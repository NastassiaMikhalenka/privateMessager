import React, {useContext, useEffect, useRef} from 'react';
import {FriendsContext, MessagesContext} from "../home";
import {ChatBox} from "./chatBox/chatBox";
import styles from "./shat.module.css";
import { v4 as uuidv4 } from 'uuid';

export const Chat = ({userid, friendIndex}) => {
    const {friendsList} = useContext(FriendsContext)
    const {messages} = useContext(MessagesContext)
    const bottomDiv = useRef(null)

    useEffect(() => {
        bottomDiv.current?.scrollIntoView();
    })
    const username = friendsList[friendIndex]?.username

    return friendsList.length > 0 ? (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>{username[0].toUpperCase()}</div>
                    <div className={styles.username}>{username}</div>
                </div>
            </div>
            <div className={styles.messagesContainer}>
                <div ref={bottomDiv}/>
                {
                    friendsList.filter(fr => fr.userid === userid)
                        .map(friend => (
                            <div key={uuidv4()} className={styles.messagesListContainer}>
                                {
                                    messages.filter(
                                        msg => msg.to === friend.userid || msg.from === friend.userid
                                    ).map(message => (
                                        <div key={uuidv4()} className={message.to === friend.userid ? `${styles.messageTo}` :`${styles.messageFrom}`}>
                                            <div className={styles.content}> <p>{message.content}</p></div>
                                        </div>
                                    ))}
                            </div>
                    ))}
            </div>
            <div className={styles.chatBoxContainer}>
                <ChatBox userid={userid}/>
            </div>
        </div>
    ) : (
        <div>
            No friends. Click add friend to start chatting :)
        </div>
    )
}