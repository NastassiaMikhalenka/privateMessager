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
        })
        socket.on("connect_error", () => {
            setUser({loggedIn: false})
        })
        return () => {
            socket.off("connect_error");
        }

    }, [setUser])
}

export default useSocket;