import UserContext from "./components/accountContext";
import Routers from "./components/routers/routers";


function App() {
    return (
        <UserContext>
            <Routers/>
        </UserContext>
    );
}

export default App;
