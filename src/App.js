// styles
import './App.css';

// react
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useState } from 'react';
import React from "react";

// pages
import Main from './pages/main/Main';
import Play from './pages/play/Play';
import Login from "./pages/login/Login"
import Register from './pages/register/Register';
import CardRegister from './pages/card-register/Card-register';
import ShowAllCards from './pages/show-all-cards/Show-all-cards';
import ShowOneCard from './pages/show-one-card/Show-one-card';

// components
import Navbar from "./components/nav/Nav";

// external
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const [isVisible, setIsVisible] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') === 'true');
    const [isAdmin, setIsAdmin] = useState(Cookies.get('isAdmin') === 'true');
    const [username, setUsername] = useState(Cookies.get('username'));
    const [password, setPassword] = useState(Cookies.get('password'));

    return (
        <BrowserRouter>
            <Navbar isVisible={isVisible} username={username} password={password}
                isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
            <Routes>
                <Route index element={<Main />} />
                <Route path="/login" element={<Login setUsername={setUsername} setPassword={setPassword}
                    setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
                <Route path="/card-register" element={<CardRegister />} />
                <Route path="/user-register" element={<Register />} />
                <Route path="/show-all-cards" element={<ShowAllCards card={{}} />} />
                <Route path="/show-one-card" element={<ShowOneCard />} />
                <Route path="/play" element={<Play setIsVisible={setIsVisible}
                    username={username} password={password} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
