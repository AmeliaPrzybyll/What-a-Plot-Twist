import { useState } from "react";
import "../components/FormLR.css";
import { register } from "../services/authService";

function Register({ onToggleForm }) {
    const [nickname, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Hasła nie są takie same.");
            return;
        }

        try {
            const data = await register(nickname, password);
            console.log("Zarejestrowano pomyślnie:", data);
            alert("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
            onToggleForm();
        } catch (err) {
            try {
                // jeśli backend odpowiedział poprawnie błędem (np. status 400)
                const res = err?.response
                    ? await err.response.json()
                    : JSON.parse(err.message);

                const passwordErrors = res.errors?.Password;

                if (Array.isArray(passwordErrors) && passwordErrors.length > 0) {
                    setError(passwordErrors[0]); // tylko konkretny komunikat
                } else {
                    setError("Wystąpił błąd walidacji.");
                }

            } catch (parseErr) {
                // jeśli nic nie udało się sparsować – fallback
                console.error("Nieoczekiwany błąd:", err);
                setError("Nieoczekiwany błąd.");
            }
        
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <img src="./src/assets/logo.png" alt="Logo" />
            </div>
            <div className="auth-right">
                <h1>Rejestracja</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nazwa użytkownika" value={nickname} onChange={(e) => setNick(e.target.value)} required />
                    <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Potwierdź hasło" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Zarejestruj się</button>
                </form>
                <p className="register-hint">lub <span className="toggle-link" onClick={onToggleForm}>zaloguj się</span></p>
            </div>
        </div>
    );
}

export default Register;