import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./login/login";
import SignUp from "./login/signUp";


const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>

            <Route path="*" element={<Login/>}/>
        </Routes>

    );
};

export default Views;