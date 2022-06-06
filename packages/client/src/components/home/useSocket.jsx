import {useContext, useEffect} from "react";
import socket from "../../socket";
import {AccountContext} from "../accountContext";

const useSocket = (setFriendsList, setMessages) => {
    const {setUser} = useContext(AccountContext);
    useEffect(() => {
        socket.connect();
        socket.on("friends", friendsList => {
            setFriendsList(friendsList)
            console.log(friendsList)
        })
        socket.on("messages", messages => {
            setMessages(messages)
            console.log(messages)
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
        }

    }, [setUser, setFriendsList, setMessages])
}

export default useSocket;