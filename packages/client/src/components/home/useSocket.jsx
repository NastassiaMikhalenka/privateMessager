import {useContext, useEffect} from "react";
import socket from "../../socket";
import {AccountContext} from "../accountContext";

const useSocket = setFriendsList => {
    const {setUser} = useContext(AccountContext);
    useEffect(() => {
        socket.connect();
        socket.on("friends", friendsList => {
            console.log(friendsList)
            setFriendsList(friendsList)
            console.log(friendsList)
        })
        socket.on("connected", (status, username) => {
            setFriendsList(prevFriends => {
                const friends = [...prevFriends];
                return friends.map(friend => {
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
        }

    }, [setUser, setFriendsList])
}

export default useSocket;