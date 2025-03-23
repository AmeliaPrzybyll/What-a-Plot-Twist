import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
    const [nickname, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Stan do przechowywania b³êdów

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Resetujemy komunikat b³êdu
        try { 
            const response = await fetch("https://localhost:7276/api/mongo/login", { // NIE WIEM CZEMU TO NIE DZIA£A
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: nickname, password }),
        });


            const data = await response.json();

            if (!response.ok) {
                throw new Error(data || "B³¹d logowania");
            }

            console.log("Zalogowano pomyœlnie:", data);
            onLogin(); // Wywo³anie funkcji logowania (np. przekierowanie)
        } catch (err) {
            console.error("B³¹d:", err.message);
            setError(err.message); // Ustawienie b³êdu do wyœwietlenia
        }
    };

    return (
        <div className="container">
            <div className="box white-container">
                <img src="./src/assets/logo.png" alt="Logo" />
            </div>
            <div className="box black-container">
                <h2>Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nazwa u¿ytkownika" value={nickname} onChange={(e) => setNick(e.target.value)} required />
                    <input type="password" placeholder="Has³o" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Zaloguj siê</button>
                </form>
                {error && <p className="error">{error}</p>} {/* Komunikat b³êdu */}
            </div>
        </div>
    );
}

export default Login;
