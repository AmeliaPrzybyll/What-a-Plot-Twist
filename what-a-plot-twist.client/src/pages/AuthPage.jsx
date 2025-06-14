import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";


// strona do logowania i rejestracji z przełączaniem formularzy

function AuthPage() {

    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = () => {
        console.log("User logged in!");
        //przekierowanie
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            {isLogin ? (
                <Login onLogin={handleLogin} onToggleForm={toggleForm} />
            ) : (
                <Register onToggleForm={toggleForm} />
            )}
        </div>
    );
}

export default AuthPage;