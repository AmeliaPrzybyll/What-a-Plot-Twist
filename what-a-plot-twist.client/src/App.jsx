//import { useEffect, useState } from 'react';
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
            </Routes>
        </Router>
    );
}

export default App;