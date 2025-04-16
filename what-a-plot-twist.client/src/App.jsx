////import { useEffect, useState } from 'react';
////import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AccountPage from './pages/AccountPage';


function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
        </Router>
    );
}

export default App;

//import AppRouter from "./router/AppRouter";

//const App = () => {
//    return <AppRouter />;
//};

//export default App;