import "./styles/Charades_Game.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Charades_Game() {
    const navigate = useNavigate();
    const location = useLocation();
    const players = location.state?.players || [];
    const selectedRound = Number(location.state?.selectedRound || 0);
    const selectedTimeLabel = location.state?.selectedTime || "30 sek";

    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [roundNumber, setRoundNumber] = useState(1);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("Przystanek");
    const [gameEnded, setGameEnded] = useState(false);

    const [firstPlayer, setFirstPlayer] = useState("");
    const [secondPlayer, setSecondPlayer] = useState("");
    const [thirdPlayer, setThirdPlayer] = useState("");
    const [firstPlayerScore, setFirstPlayerScore] = useState(0);
    const [secondPlayerScore, setSecondPlayerScore] = useState(0);
    const [thirdPlayerScore, setThirdPlayerScore] = useState(0);

    const timeMapping = {
        "30 sek": 30,
        "1 min": 60,
        "2 min": 120,
    };

    const questions = ["Koń", "Krowa", "Ziemniak", "Pies", "Kot"];

    const [playerTurnCount, setPlayerTurnCount] = useState(
        players.reduce((acc, player) => {
            acc[player] = 0;
            return acc;
        }, {})
    );

    const [playerScores, setPlayerScores] = useState(
        players.reduce((acc, player) => {
            acc[player] = 0;
            return acc;
        }, {})
    );

    const handleNewQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[randomIndex]);
    };

    const handleBack = () => {
        navigate("/charades");
    };

    const startTurnTimer = () => {
        const totalSeconds = timeMapping[selectedTimeLabel];
        setTimeLeft(totalSeconds);
        setIsRunning(true);
    };

    useEffect(() => {
        if (players.length > 0) {
            setSelectedPlayer(players[0]);
            startTurnTimer();
        }
    }, [players]);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0 || gameEnded) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsRunning(false);
                    endTurn();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, timeLeft, gameEnded]);

    useEffect(() => {
        if (selectedPlayer) {
            handleNewQuestion();
        }
    }, [selectedPlayer]);

    const endTurn = () => {
        const newTurnCount = { ...playerTurnCount };
        newTurnCount[selectedPlayer] += 1;
        setPlayerTurnCount(newTurnCount);

        const newScores = { ...playerScores };
        newScores[selectedPlayer] += 10;
        setPlayerScores(newScores);

        checkGameEnd(newTurnCount);
    };

    const endTurn2 = () => {
        const newTurnCount = { ...playerTurnCount };
        newTurnCount[selectedPlayer] += 1;
        setPlayerTurnCount(newTurnCount);

        checkGameEnd(newTurnCount);
    };

    const checkGameEnd = (updatedTurnCount) => {
        const allRoundsDone = Object.values(updatedTurnCount).every(
            (turns) => turns >= selectedRound
        );

        if (allRoundsDone) {
            setGameEnded(true);
            setIsRunning(false);
            setTimeLeft(0); // Reset zegara po zakończeniu gry
            calculateResults();
            return;
        }

        const nextIndex = (currentPlayerIndex + 1) % players.length;
        setCurrentPlayerIndex(nextIndex);
        setSelectedPlayer(players[nextIndex]);
        startTurnTimer();
    };

    useEffect(() => {
        if (players.length === 0) return;

        if (gameEnded) {
            setRoundNumber(selectedRound);
            return;
        }

        const minTurns = Math.min(...Object.values(playerTurnCount));
        const nextRound = minTurns + 1;

        setRoundNumber(nextRound > selectedRound ? selectedRound : nextRound);
    }, [playerTurnCount, gameEnded, players.length, selectedRound]);

    const calculateResults = () => {
        const sortedResults = Object.entries(playerScores).sort((a, b) => b[1] - a[1]);

        setFirstPlayer(sortedResults[0]?.[0] || "");
        setFirstPlayerScore(sortedResults[0]?.[1] || 0);

        setSecondPlayer(sortedResults[1]?.[0] || "");
        setSecondPlayerScore(sortedResults[1]?.[1] || 0);

        setThirdPlayer(sortedResults[2]?.[0] || "");
        setThirdPlayerScore(sortedResults[2]?.[1] || 0);
    };

    return (
        <>
            <div className="charadesGame-page">
                <nav className="navbar-6">
                    <button className="back-button" onClick={handleBack}>
                        ◀
                    </button>
                    <div className="charadesGame">
                        <p>Kalambury</p>
                    </div>
                </nav>

                <div className="main-2">
                    <div className="turn">
                        <p>
                            Runda {roundNumber} z {selectedRound}
                        </p>
                        <div className="timer">
                            <p>
                                Pozostały czas:{" "}
                                {Math.floor(timeLeft / 60)
                                    .toString()
                                    .padStart(2, "0")}
                                :{(timeLeft % 60).toString().padStart(2, "0")}
                            </p>
                        </div>
                    </div>

                    <div className="playerName2">
                        <p>Kolej na:</p>
                        <p className="name">{selectedPlayer}</p>
                    </div>

                    <div className="charade-word-container">
                        <div className="charade-word">
                            <p>{currentQuestion}</p>
                        </div>
                        <div className="modal-charade-buttons">
                            <button className="relode" onClick={handleNewQuestion}>
                                ⟳
                            </button>
                            <button className="passed" onClick={endTurn}>
                                ✔
                            </button>
                            <button className="notPassed" onClick={endTurn2}>
                                X
                            </button>
                        </div>
                    </div>
                </div>

                {gameEnded && !isRunning && timeLeft === 0 && (
                    <div className="results">
                        <div className="results-container">
                            <div>
                                <button className="back-button6" onClick={handleBack}>
                                    ◀
                                </button>
                            </div>
                            <div className="result">
                                <img src="./src/assets/crown.png" alt="Logo3" />
                                <div className="firstPlayer">
                                    <p className="firstNamePlayer">{firstPlayer}</p>
                                    <p>{firstPlayerScore}pkt</p>
                                    
                                </div>
                                <p className="ranking">Ranking</p>
                                <div className="result-a">
                                    <div className="left">
                                        <h3>2</h3>
                                    </div>
                                    <div className="right">
                                        <p >{secondPlayer}</p>
                                        <p className="ranking">{secondPlayerScore}pkt</p>
                                    </div>
                                </div>
                                <div className="result-a">
                                    <div className="left">
                                        <h3>3</h3>
                                    </div>
                                    <div className="right">
                                        <p >{thirdPlayer}</p>
                                        <p className="ranking">{thirdPlayerScore}pkt</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="rotate-warning">
                <h3>Obróć telefon poziomo, aby kontynuować grę. </h3>
                <h1>⟳</h1>
            </div>
        </>
    );
}
