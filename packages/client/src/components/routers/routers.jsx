import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../auth/login";
import SignUp from "../auth/signUp";
import PrivateRoutes from "./privateRoutes";
import {AccountContext} from "../accountContext";
import {Home} from "../home/home";


const Routers = () => {
    const {user} = useContext(AccountContext)
    // добавить компонент загрузки
    return user.loggedIn === null ? (
        <div>Loading...</div>
    ) : (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route path="/home" element={<Home/>}/>
            </Route>
            <Route path="*" element={<Login/>}/>
        </Routes>
    );
};

export default Routers;