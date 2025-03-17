import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) { //komponent funkcyjny

    const [nickname, setNick] = useState(""); //przechowywanie i odœwie¿anie wartoœci
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => { //wys³anie formularza
        e.preventDefault(); //zapobiega prze³adowaniu strony
        console.log("Logging in with:", { nickname, password });
        onLogin();
    }

    return (
        <div class="container">
            <div class="box white-container">
            <img src="./src/assets/logo.png"/>
            </div>
            <div className="box black-container">
                <h2 >Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nazwa u¿ytkownika" value={nickname} onChange={(e) => setNick(e.target.value)} required />
                    <input
                        type="password"
                        placeholder="Haslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Zaloguj sie</button>
                </form>
            </div>
        </div>
    );
}

export default Login;