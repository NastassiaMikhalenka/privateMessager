import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AccountContext} from "./accountContext";

const useAuth = () => {
    const {user} = useContext(AccountContext)
    // const user = {loggedIn: false}
    return user && user.loggedIn;
}

const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/"/>
}

export default PrivateRoutes;