import UserContext from "./components/accountContext";
import Routers from "./components/routers/routers";
import socket from "./socket/socket";
import {useEffect} from "react";


function App() {
        socket.connect();
    return (
        <UserContext>
            <Routers/>
        </UserContext>
    );
}

export default App;
