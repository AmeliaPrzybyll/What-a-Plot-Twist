import "../styles/Choice_TruthOrDare.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const truthQuestions = [
    "Jaki jest Twój ulubiony film?",
    "Jakie jest Twoje największe marzenie?",
    "Co byłoby Twoim wymarzonym zawodem?",
    "Jakie jest Twoje najdziwniejsze wspomnienie?",
    "Co najbardziej cenisz w przyjaźni?",
    "Jaka jest Twoja najgorsza cecha?",
    "Co byś zmienił w swoim życiu, gdybyś miał szansę?",
    "Jakie jest Twoje największe osiągnięcie?",
    "Jaka jest Twoja najgorsza wada?",
    "Kogo podziwiasz najbardziej?"
];

const dares = [
    "Zatańcz przez 30 sekund.",
    "Pokaż wszystkim swoje najzabawniejsze zdjęcie.",
    "Zrób 10 pompek.",
    "Zaśpiewaj swoją ulubioną piosenkę.",
    "Spróbuj zrobić 10 przysiadów bez przerwy.",
    "Zrób zdjęcie swojej twarzy z jakimś zabawnym wyrazem.",
    "Pokaż wszystkim swój taniec, który nauczyłeś się w szkole.",
    "Przebierz się w coś szalonego na 5 minut.",
    "Zadzwoń do znajomego i zaśpiewaj mu piosenkę.",
    "Zaśpiewaj i zatańcz do kawałka, który właśnie leci w tle."
];

export default function Chice_TruthOrDare() {
    const navigate = useNavigate();
    const location = useLocation();
    const players = location.state?.players || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const punishment = location.state?.punishment || "Brak kary";
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
        endTurn(); //Kończymy turę
    };

    const closeModal2 = () => {
        setIsModalOpen2(false);
        endTurn(); //Kończymy turę
    };

    const closeModal3 = () => {
        setIsModalOpen3(false);
        endTurn(); //Kończymy turę
    };

    const notPassed = () => {
        setIsModalOpen(false);
        setIsModalOpen2(true);
    };

    const notPassed3 = () => {
        setIsModalOpen3(false);
        setIsModalOpen2(true);
    };
//:DO ZROBIENIA -> WYŚWITALNIE WYNIKÓW
    const showResults = () => {
        alert("Gra zakończona! Wyniki zostaną wyświetlone.");
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
                    <div className="div-truth-button" >
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

                    {/* Wyświtlanie wyników*/}
                    {gameEnded && (
                        <div className="game-end">
                            <h2>Gra zakończona!</h2>
                            <button onClick={showResults}>Pokaż wyniki</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="rotate-warning">
                <h3>Obróć telefon poziomo, aby kontynuować grę. </h3>
                <h1>⟳</h1>
            </div>
        </>
    );
}
