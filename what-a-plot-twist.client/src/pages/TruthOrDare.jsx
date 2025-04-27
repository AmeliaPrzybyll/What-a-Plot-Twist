import React, { useState } from "react";
import "../styles/TruthOrDare.css";
import { useNavigate } from "react-router-dom";

export default function TruthOrDare() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState("");

    const handleBack = () => {
        navigate("/home");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewPlayerName("");
    };

    const addPlayer = () => {
        if (newPlayerName.trim() !== "") {
            setPlayers([...players, newPlayerName.trim()]);
            closeModal();
        }
    };

    const removePlayer = (indexToRemove) => {
        setPlayers(players.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="truthOrDare-page">
            <nav className="navbar-2">
                <button className="back-button" onClick={handleBack}>◀</button>
                <div className="truth-or-dare">
                    <h2>Prawda Czy Wyzwanie</h2>
                </div>
            </nav>

            <main className="main">
                <div className="add-player">
                    <label className="players-label">Wprowadź graczy:</label>
                    <div className="players-list">
                        {players.map((player, index) => (
                            <div className="player-bubble" key={index}>
                                {player}
                                <span className="remove-player" onClick={() => removePlayer(index)}>×</span>
                            </div>
                        ))}
                        
                    </div>
                    <button className="add-button" onClick={openModal}>+</button>

                </div>

                <div className="punishment">
                    <div className="punishment-text">
                        <h2>Tutaj możesz ustalić karę za niewykonane zadanie</h2>
                    </div>
                    <input
                        className="punishment-input"
                        type="text"  
                        placeholder="Wpisz karę"
                        maxLength={30}
                    />

                </div>




                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Dodaj gracza</h2>
                            <input
                                type="text"
                                value={newPlayerName}
                                onChange={(e) => setNewPlayerName(e.target.value)}
                                placeholder="Podaj imię"
                                maxLength={15}
                            />
                            <div className="modal-buttons">
                                 <button onClick={addPlayer}>Dodaj</button>
                                 <button onClick={closeModal}>Anuluj</button>
                                
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
