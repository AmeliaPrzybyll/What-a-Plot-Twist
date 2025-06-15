import React, { useState } from "react";
import "../styles/Charades.css";
import { useNavigate } from "react-router-dom";


export default function Charades() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const times = ["30 sek", "1 min", "2 min"];
    const [selectedCategory2, setSelectedCategory2] = useState("");

    const categories = [
        "Zwierzęta",
        "Postacie",
        "Filmy",
        "Rzeczy",
        "Politycy",
        "Emocje",
        "Kwiaty",
        "Gry"
    ];

    const [selectedRound, setSelectedRound] = useState("");

    const handleGameCharades = () => {
        if (players.length < 2) {
            alert("Gra dla miminum 2 graczy.");
            return;
        }
        if (!selectedRound) {
            alert("Wybierz ilość rund.");
            return;
        }

        if (!selectedTime) {
            alert("Wybierz czas na rundę.");
            return;
        }

        if (!selectedCategory2) {
            alert("Wybierz kategorię.");
            return;
        }
        navigate("/charades_game", { state: { players, selectedRound, selectedTime, selectedCategory2 } });
    };

    const handleSelectChange = (e) => {
        setSelectedRound(e.target.value);
    };

    const handleBack = () => {
        navigate("/home");
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
        <div>
            <div className="charades-page">
                <nav className="navbar-4">
                    <button className="back-button4" onClick={handleBack}>◀</button>
                    <div className="charades">
                        <p>Kalambury</p>
                    </div>
                </nav>
                <main className="main-charades">
                    <div className="left-container">
                        <div className="add-player-c">
                            <p className="players-label-c">Wprowadź graczy:</p>
                            <div className="players-list-c">
                                {players.map((player, index) => (
                                    <div className="player-bubble-c" key={index}>
                                        {player}
                                        <span className="remove-player-c" onClick={() => removePlayer(index)}>×</span>
                                    </div>
                                ))}
                                <button className="add-button-c" onClick={openModal} disabled={players.length >= 8}>+</button>
                            </div>

                        </div>
                        <div className="category-c">
                            <p className="chouse-c">Wybierz kategorię:</p>
                            <div className="column">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`button-c ${selectedCategory2 === category ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory2(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                        </div>
                        <div className="option-container">
                            <div className="roundCount">
                                <p>Wybierz ilość rund</p>

                                <div className="select-container">
                                    <select
                                        className="select"
                                        value={selectedRound}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="" disabled>Wybierz...</option>
                                        <option value="1">1 runda</option>
                                        <option value="2">2 rundy</option>
                                        <option value="3">3 rundy</option>
                                        <option value="4">4 rundy</option>
                                    </select>
                                </div>
                            </div>
                            <div className="timeCount">
                                <p>Wybierz czas na rundę</p>
                                <div className="button-container">
                                    {times.map((time) => (
                                        <button
                                            key={time}
                                            className={`button-c-2 ${selectedTime === time ? 'active' : ''}`}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-container">
                        <img src="./src/assets/logo.png" alt="Logo" />
                        <button className="button-start" onClick={handleGameCharades}>Start</button>
                    </div>

                    {isModalOpen && (
                        <div className="modal-c">
                            <div className="modal-content-c">
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
            <div className="rotate-warning-3">
                <h3>Obróć telefon poziomo, aby kontynuować grę. </h3>
                <h1>⟳</h1>
            </div>
        </div>
    );
}
