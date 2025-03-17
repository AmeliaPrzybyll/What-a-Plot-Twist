import Login from "../components/Login";

function LoginPage() {
    const handleLogin = () => {
        console.log("User logged in!");
        //przekierowanie
    };

    return (
        <div>
            <Login onLogin={handleLogin} />
        </div>
    );
}

export default LoginPage;