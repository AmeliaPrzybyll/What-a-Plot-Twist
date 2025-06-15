import React, { useState } from "react";
import "../styles/TruthOrDare.css";
import { useNavigate } from "react-router-dom";

export default function TruthOrDare() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState("");
    const [punishment, setPunishment] = useState("");

    const handleBack = () => {
        navigate("/home");
    };

    const handleGameTruthOrDare = () => {
        if (players.length < 2) {
            alert("Gra dla miminum 2 graczy.");
            return;
        }
        if (punishment.length < 1) {
            alert("Dodaj karę.");
            return;
        }
        navigate("/choice_truthOrDare", { state: { players, punishment } });
    };


    const openModal = () => {
        if (players.length >= 8) {
            alert("Można dodać maksymalnie 8 graczy.");
            return;
        }
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setNewPlayerName("");
    };

    const addPlayer = () => {
        const trimmedName = newPlayerName.trim();

        if (trimmedName === "") {
            return;
        }

        const nameExists = players.some(
            (player) => player.toLowerCase() === trimmedName.toLowerCase()
        );

        if (nameExists) {
            alert("To imię już zostało dodane.");
            return;
        }

        if (newPlayerName.trim() !== "") {
            setPlayers([...players, trimmedName]);
            closeModal();
        }
        
    };

    


    const removePlayer = (indexToRemove) => {
        setPlayers(players.filter((_, index) => index !== indexToRemove));
    };

    return (
        <>
            <div className="truthOrDare-page">
                <nav className="navbar-5">
                    <button className="back-button" onClick={handleBack}>◀</button>
                    <div className="truth-or-dare">
                        <h3>Prawda Czy Wyzwanie</h3>
                    </div>
                </nav>


                <main className="main">
                    <div className="add-player">
                        <h3 className="players-label">Wprowadź graczy:</h3>
                        <div className="players-list">
                            {players.map((player, index) => (
                                <div className="player-bubble" key={index}>
                                    {player}
                                    <span className="remove-player" onClick={() => removePlayer(index)}>×</span>
                                </div>
                            ))}
                        
                        </div>
                        <button className="add-button" onClick={openModal} disabled={players.length >= 8}>+</button>

                    </div>

                    <div className="punishment">
                        <div className="punishment-text">
                            <h4>Tutaj możesz ustalić karę za niewykonane zadanie</h4>
                        </div>
                        <input
                            className="punishment-input"
                            type="text"  
                            placeholder="Wpisz karę"
                            value={punishment}
                            onChange={(e) => setPunishment(e.target.value)}
                            maxLength={30}
                        />
                    </div>

                    <div className="game-start">
                        <button className="start-game-button" onClick={handleGameTruthOrDare}>Start</button>
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

            <div className="rotate-warning">
                <h3>Obróć telefon poziomo, aby kontynuować grę. </h3>
                <h1>⟳</h1>
            </div>
        </>
    );
}
