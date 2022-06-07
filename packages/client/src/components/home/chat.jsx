import React, {useContext, useEffect, useRef} from 'react';
import {FriendsContext, MessagesContext} from "./home";
import {ChatBox} from "./chatBox";
import styles from "./shat.module.css";

export const Chat = ({friendIndex}) => {
    const {friendsList} = useContext(FriendsContext)
    const {messages} = useContext(MessagesContext)
    const bottomDiv = useRef(null)

    useEffect(() => {
        bottomDiv.current?.scrollIntoView();
    })

    return friendsList.length > 0 ? (
        <div>
            <p>Chat</p>
            <p>{friendIndex} УДАЛИТЬ</p>
            <div className={styles.messagesContainer}>
                <div ref={bottomDiv}/>
                {
                    friendsList.map(friend => (
                        <div>
                            {
                                messages.filter(
                                    msg => msg.to === friend.userid || msg.from === friend.userid
                                ).map(message => (
                                        <div style={{color: message.to === friend.userid ? "blue" : "green"}}>
                                            <p>{message.content}</p>
                                        </div>
                                    ))}
                        </div>
                    ))}
            </div>
            <div>
                <ChatBox friendIndex={friendIndex}/>
            </div>
        </div>
    ) : (
        <div>
            No friends. Click add friend to start chatting
        </div>
    )
}