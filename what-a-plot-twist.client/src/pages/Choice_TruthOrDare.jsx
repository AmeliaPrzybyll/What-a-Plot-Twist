import "../styles/Choice_TruthOrDare.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { truthQuestion } from "../constants/truthQuestions";
import { dare } from "../constants/dares";

const truthQuestions = truthQuestion;
const dares = dare;

export default function Chice_TruthOrDare() {
    const navigate = useNavigate();
    const location = useLocation();
    const players = location.state?.players || [];
    const punishment = location.state?.punishment || "Brak kary";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [showingResults, setShowingResults] = useState(false);

    const [truthText, setTruthText] = useState("");
    const [dareText, setDareText] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    const [playerTurnCount, setPlayerTurnCount] = useState(
        players.reduce((acc, player) => {
            acc[player] = 0;
            return acc;
        }, {})
    );

    const [gameEnded, setGameEnded] = useState(false);

    useEffect(() => {
        if (players.length > 0) {
            setSelectedPlayer(players[0]);
        }
    }, [players]);

    const fetchTruth = () => {
        const randomTruth = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
        setTruthText(randomTruth);
    };

    const fetchDare = () => {
        const randomDare = dares[Math.floor(Math.random() * dares.length)];
        setDareText(randomDare);
    };

    const refreshTruth = () => {
        fetchTruth();
    };

    const refreshDare = () => {
        fetchDare();
    };

    const endTurn = () => {
        const newTurnCount = { ...playerTurnCount };
        newTurnCount[selectedPlayer] += 1;
        setPlayerTurnCount(newTurnCount);

        if (Object.values(newTurnCount).every(turns => turns >= 3)) {
            setGameEnded(true);
        } else {
            selectNextPlayer();
        }
    };

    const selectNextPlayer = () => {
        if (players.length === 0) return;

        const nextIndex = (currentPlayerIndex + 1) % players.length;
        setCurrentPlayerIndex(nextIndex);
        setSelectedPlayer(players[nextIndex]);
    };

    const handleBack = () => {
        navigate("/truthOrDare");
    };

    const openModal = () => {
        fetchTruth();
        setIsModalOpen(true);
    };

    const openModal3 = () => {
        fetchDare();
        setIsModalOpen3(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        endTurn();
    };

    const closeModal2 = () => {
        setIsModalOpen2(false);
        endTurn();
    };

    const closeModal3 = () => {
        setIsModalOpen3(false);
        endTurn();
    };

    const notPassed = () => {
        setIsModalOpen(false);
        setIsModalOpen2(true);
    };

    const notPassed3 = () => {
        setIsModalOpen3(false);
        setIsModalOpen2(true);
    };

    const showResults = () => {
        setIsModalOpen(false);
        setIsModalOpen2(false);
        setIsModalOpen3(false);
        setShowingResults(true);
    };

    const closeResults = () => {
        setShowingResults(false);
        navigate("/truthOrDare");
    };

    return (
        <>
            <div className="truthOrDare-page">
                <nav className="navbar-2">
                    <button className="back-button" onClick={handleBack}>◀</button>
                    <div className="truth-or-dare">
                        <h2>Prawda Czy Wyzwanie</h2>
                    </div>
                </nav>

                <div className="playerName">
                    <h3>{selectedPlayer}</h3>
                </div>

                <div className="main">
                    <div className="div-truth-button">
                        <button className="truth-button" onClick={openModal}>
                            <h2>Prawda</h2>
                        </button>
                    </div>
                    <div className="div-dare-button">
                        <button className="dare-button" onClick={openModal3}>
                            <h2>Wyzwanie</h2>
                        </button>
                    </div>

                    {isModalOpen && (
                        <div className="modal-truth">
                            <div className="modal-truth-content">
                                <h2>{truthText}</h2>
                                <div className="modal-truth-buttons">
                                    <button className="relode" onClick={refreshTruth}>⟳</button>
                                    <button className="passed" onClick={closeModal}>✔</button>
                                    <button className="notPassed" onClick={notPassed}>X</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isModalOpen2 && (
                        <div className="modal-truth">
                            <div className="modal-not-passed" value={punishment}>
                                <h2>Kara: {punishment}</h2>
                                <div className="modal-truth-buttons">
                                    <button className="ok" onClick={closeModal2}>OK</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isModalOpen3 && (
                        <div className="modal-truth">
                            <div className="modal-truth-content">
                                <h2>{dareText}</h2>
                                <div className="modal-truth-buttons">
                                    <button className="relode" onClick={refreshDare}>⟳</button>
                                    <button className="passed" onClick={closeModal3}>✔</button>
                                    <button className="notPassed" onClick={notPassed3}>X</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {gameEnded && (
                        <div className="game-end">
                            <h2>Gra zakończona!</h2>
                            <button onClick={showResults}>Pokaż wyniki</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="rotate-warning">
                <h3>Obróć telefon poziomo, aby kontynuować grę.</h3>
                <h1>⟳</h1>
            </div>

            {showingResults && (
                <div className="modal-truth">
                    <div className="modal-results-content">
                        <h2>Wyniki Gry</h2>
                        <ul>
                            {players.map(player => (
                                <li key={player}>
                                    {player}: {playerTurnCount[player]} tur
                                </li>
                            ))}
                        </ul>
                        <button onClick={closeResults}>Zamknij</button>
                    </div>
                </div>
            )}
        </>
    );
}
