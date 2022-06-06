import UserContext from "./components/accountContext";
import ToggleColorMode from "./components/toggleColorMode";
import Routers from "./components/routers";
// import socket from "./socket";


function App() {
    // socket.connect();
    return (
        <UserContext>
            <Routers/>
            <ToggleColorMode/>
        </UserContext>
    );
}

export default App;
