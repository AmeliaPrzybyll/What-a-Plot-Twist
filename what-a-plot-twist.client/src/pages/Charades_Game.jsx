import "../styles/Charades_Game.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Charades_Game() {
    const navigate = useNavigate();
    const location = useLocation();
    const players = location.state?.players || [];

    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    const handleBack = () => {
        navigate("/truthOrDare");
    };

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
                    
                </div>
            </div>

            <div className="rotate-warning">
                <h3>Obróć telefon poziomo, aby kontynuować grę. </h3>
                <h1>⟳</h1>
            </div>
        </>
    );
}
