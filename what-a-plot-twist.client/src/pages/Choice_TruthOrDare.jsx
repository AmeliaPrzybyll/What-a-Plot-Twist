
import "../styles/Choice_TruthOrDare.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Chice_TruthOrDare() {
    const navigate = useNavigate();
    const location = useLocation();
    const players = location.state?.players || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const punishment = location.state?.punishment || "Brak kary";
    const [truthText, setTruthText] = useState(""); //to
    const [dareText, setDareText] = useState(""); //to

    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);  

    useEffect(() => {
        if (players.length > 0) {
            setSelectedPlayer(players[0]);
        }
    }, [players]);

    const fetchTruth = async () => {
        try {
            const response = await fetch("http://localhost:7276/api/chatgpt/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: "Podaj jedno pytanie do gry Prawda czy Wyzwanie (prawda)"
                }),
            });
            const data = await response.json();
            setTruthText(data.response);
        } catch (err) {
            console.error("Błąd pobierania prawdy:", err);
        }
    };

    const fetchDare = async () => {
        try {
            const response = await fetch("http://localhost:7276/api/chatgpt/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: "Podaj jedno wyzwanie do gry Prawda czy Wyzwanie"
                }),
            });
            const data = await response.json();
            setDareText(data.response);
        } catch (err) {
            console.error("Błąd pobierania wyzwania:", err);
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
        fetchTruth(); //to
        setIsModalOpen(true);
    };
    const openModal3 = () => {
        fetchDare(); //to
        setIsModalOpen3(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        selectNextPlayer();

    };
    const closeModal2 = () => {
        setIsModalOpen2(false);
        selectNextPlayer();
    };
    const closeModal3 = () => {
        setIsModalOpen3(false);
        selectNextPlayer();
    };
    const notPassed = () => {
        setIsModalOpen(false);
        setIsModalOpen2(true);

    }
    const notPassed3 = () => {
        setIsModalOpen3(false);
        setIsModalOpen2(true);

    }
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
                                    <button className="relode" >⟳</button>
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
                                    <button className="relode" >⟳</button>
                                    <button className="passed" onClick={closeModal3}>✔</button>
                                    <button className="notPassed" onClick={notPassed3}>X</button>

                                </div>
                            </div>
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