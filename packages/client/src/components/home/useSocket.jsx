import {useContext, useEffect} from "react";
import socket from "../../socket/socket";
import {AccountContext} from "../accountContext";

const useSocket = (setFriendsList, setMessages) => {
    const {setUser} = useContext(AccountContext);
    useEffect(() => {
        socket.connect();
        socket.on("friends", friendsList => {
            setFriendsList(friendsList)
        })
        socket.on("messages", messages => {
            setMessages(messages)
        })
        socket.on("dm", message => {
            setMessages(prevMsgs => [message, ...prevMsgs ])
        })
        socket.on("connected", (status, username) => {
            setFriendsList(prevFriends => {
                return [...prevFriends].map(friend => {
                    if (friend.username === username) {
                        friend.connected = status;
                    }
                    return friend;
                })
            })
        })

        socket.on("connect_error", () => {
            setUser({loggedIn: false})
        })
        return () => {
            socket.off("connect_error");
            socket.off("connected");
            socket.off("friends");
            socket.off("messages");
            // socket.off("dm");
        }

    }, [setUser, setFriendsList, setMessages])
}

export default useSocket;