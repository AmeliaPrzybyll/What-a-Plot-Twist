import React from "react";
import "../styles/HomePage.css";
import userIcon from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/grafika_strona_gl.png";

export default function HomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // tu czyszczenie sesji
        navigate("/");
    };

    const handleTruthOrDare = () => {
        navigate("/truthOrDare");
    };
    const handleNeverEver = () => {
        navigate("/neverEver");
    };
    const handleCharades = () => {
        navigate("/charades");
    };
    const handleFakeNews = () => {
        navigate("/fakeNews");
    };

    return (
        <div className="home-page">
            <nav className="navbar">
                <div className="logo">What a Plot Twist!</div>
                <div className="user-panel">
                    <img
                        src={userIcon}
                        alt="User Icon"
                        className="user-icon"
                        onClick={() => navigate("/account")}
                    />
                    <button className="logout-button" onClick={handleLogout}>
                        Wyloguj się
                    </button>
                </div>
            </nav>

            <main className="main-content">
                <img src={heroImage} alt="Hero" className="hero-image" />
                <h2>Wybierz w co chcesz zagrać:</h2>

                <div className="game-buttons">
                    <button className="game-button" onClick={handleTruthOrDare}>Prawda czy wyzwanie</button>
                    <button className="game-button" onClick={handleNeverEver}>Nigdy przenigdy</button>
                    <button className="game-button" onClick={handleCharades}>Kalambury</button>
                    <button className="game-button" onClick={handleFakeNews}>Czy to fake news</button>
                </div>
            </main>
        </div>
    );
}
