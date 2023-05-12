import ShowAllCards from './components/admin/show-all-cards/Show-all-cards';
import CardRegister from './components/admin/card-register/Card-register';
import ShowOneCard from './components/admin/show-one-card/Show-one-card';
import UserRegister from './components/user-register/User-register';
import {Routes, BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login"
import Play from './components/play/Play';
import Navbar from "./components/nav/Nav";
import Main from './components/main/Main';
import { useState } from 'react';
import Cookies from 'js-cookie';
import React from "react";
import './App.css';

function App() {
    const [isVisible, setIsVisible] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') === 'true');
    const [isAdmin, setIsAdmin] = useState(Cookies.get('isAdmin') === 'true');
    const [username, setUsername] = useState(Cookies.get('username'));
    const [password, setPassword] = useState(Cookies.get('password'));
    
    return(
        <BrowserRouter>
            <Navbar isVisible={isVisible} username={username} password={password} 
            isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
            <Routes>
                <Route index element={<Main />} />
                <Route path="/login" element={<Login setUsername={setUsername} setPassword={setPassword} 
                    setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin}/>}/>
                <Route path="/card-register" element={<CardRegister />}/>
                <Route path="/user-register" element={<UserRegister />}/>
                <Route path="/show-all-cards" element={<ShowAllCards card={{}} />}/>
                <Route path="/show-one-card" element={<ShowOneCard />}/>
                <Route path="/play" element={<Play setIsVisible={setIsVisible} />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
