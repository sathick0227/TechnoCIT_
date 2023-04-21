import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//LOCAL UTILS IMPORT
import { SCREENS } from "../constants/constants.js";
// SCREENS IMPORT
import Login from '../screens/login/Login.js';
import Signup from "../screens/signup/SignUp.js";
import Home from '../screens/Home/Home.js';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Login />} />
                <Route path={'/signup'} element={<Signup />} />
                <Route path={'/home'} element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}