// styles
import './App.css';
import './assets/custom/Color.css'

// react
import { Routes, BrowserRouter, Route } from "react-router-dom";
import React from "react";

// pages
import Main from './pages/main/Main';
import Login from "./pages/login/Login"
import Register from './pages/register/Register';
import CardRegister from './pages/card-register/Card-register';
import ShowAllCards from './pages/show-all-cards/Show-all-cards';
import ShowOneCard from './pages/show-one-card/Show-one-card';
import Play from './pages/play/Play';

// context
import { AudioProvider } from './context/AudioContext';

// external
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <AudioProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/card-register" element={<CardRegister />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/show-all-cards" element={<ShowAllCards />} />
                    <Route path="/show-one-card" element={<ShowOneCard />} />
                    <Route path="/play" element={<Play />} />
                </Routes>
            </BrowserRouter>
        </AudioProvider>
    );
}

export default App;
