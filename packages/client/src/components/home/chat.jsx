import React, {useContext, useEffect, useRef} from 'react';
import {FriendsContext, MessagesContext} from "./home";
import {ChatBox} from "./chatBox";
import styles from "./shat.module.css";

export const Chat = ({userid}) => {
    const {friendsList} = useContext(FriendsContext)
    const {messages} = useContext(MessagesContext)
    const bottomDiv = useRef(null)

    useEffect(() => {
        bottomDiv.current?.scrollIntoView();
    })

    return friendsList.length > 0 ? (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <p>Chat</p>
                {/*<p>{name}</p>*/}
            </div>
            <div className={styles.messagesContainer}>
                <div ref={bottomDiv}/>
                {
                    friendsList.filter(fr => fr.userid === userid)
                        .map(friend => (
                        <>
                            <div key={friend.userid} className={styles.messagesListContainer}>
                                {
                                    messages.filter(
                                        msg => msg.to === friend.userid || msg.from === friend.userid
                                    ).map(message => (
                                        <div className={message.to === friend.userid ? `${styles.messageTo}` :`${styles.messageFrom}`}>
                                            <div className={styles.content}> <p>{message.content}</p></div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ))}
            </div>
            <div className={styles.chatBoxContainer}>
                <ChatBox userid={userid}/>
            </div>
        </div>
    ) : (
        <div>
            No friends. Click add friend to start chatting
        </div>
    )
}