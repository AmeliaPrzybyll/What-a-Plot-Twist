////import { useEffect, useState } from 'react';
////import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
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