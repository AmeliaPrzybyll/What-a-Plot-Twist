import { useState } from "react";
import "../components/FormLR.css";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Login({ onLogin, onToggleForm }) {


    const [nickname, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await login(nickname, password);
            console.log("Zalogowano pomyślnie:", data);
            navigate("/home");
            onLogin();
        } catch (err) {
            console.error("Błąd:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <img src="./src/assets/logo.png" alt="Logo" />
            </div>
            <div className="auth-right">
                <h1>Logowanie</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nazwa użytkownika" value={nickname} onChange={(e) => setNick(e.target.value)} required />
                    <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Zaloguj się</button>
                </form>
                <p className="register-hint">lub <span className="toggle-link" onClick={onToggleForm}>zarejestruj się</span></p>
            </div>
        </div>
    );
}

export default Login;