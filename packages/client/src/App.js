import UserContext from "./components/accountContext";
import ToggleColorMode from "./components/toggleColorMode";
import Routers from "./components/routers";


function App() {
    return (
        <UserContext>
            <Routers/>
            <ToggleColorMode/>
        </UserContext>
    );
}

export default App;
