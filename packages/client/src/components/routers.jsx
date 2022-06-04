import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./login/login";
import SignUp from "./login/signUp";
import PrivateRoutes from "./privateRoutes";


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route path="/home" element={<div>Hi! Welcome home</div>}/>
            </Route>
            {/*<Route path="/home" element={<div>Hi! Welcome home</div>}/>*/}
            {/*<Route path="*" element={<Login/>}/>*/}
        </Routes>

    );
};

export default Routers;