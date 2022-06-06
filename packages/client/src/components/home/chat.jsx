import React, {useContext} from 'react';
import styles from './home.module.css';
import {FriendsContext, MessagesContext} from "./home";

export const Chat = () => {
    const {friendsList} = useContext(FriendsContext)
    const {messages} = useContext(MessagesContext)
    return friendsList.length > 0 ? (
        <>
            <div>
                <p>Chat</p>
                <div>
                    {friendsList.map(friend => (
                        <div>
                            {messages.filter(
                                msg => msg.to === friend.userid || msg.from === friend.userid
                            ).map(message => (
                                <p>{message.content}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        </>
    ) : (
        <div>
            No friends. Click add friend to start chatting
        </div>
    )
}