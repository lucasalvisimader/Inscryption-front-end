// styles
import './App.css';
import './assets/custom/Color.css'

// react
import { Routes, BrowserRouter, Route } from "react-router-dom";
import React, { useEffect } from "react";

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

// lib
import i18n from './assets/lib/i18n';

// external
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider } from 'react-i18next';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const LanguageUpdater = () => {
    const { language } = useLanguage();

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

        return null;
};
  
const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <LanguageProvider>
                <LanguageUpdater />
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
            </LanguageProvider>
        </I18nextProvider>
    );
};
  
export default App;
