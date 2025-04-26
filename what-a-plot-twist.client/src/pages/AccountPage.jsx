import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountPage.css';

export default function AccountPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Zmieniono dane:", { username, password, photo });
        // TODO: dodaj obsługę API
    };

    const handleLogout = () => {
        // TODO: dodaj czyszczenie sesji/tokenu
        navigate('/login');
    };

    return (
        <div className="account-page">
            <h1>Konto użytkownika</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Zdjęcie profilowe:
                    <input type="file" onChange={handlePhotoChange} />
                </label>
                <label>
                    Nazwa użytkownika:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Hasło:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div className="button-row">
                    <button className="save-button" type="submit">Zapisz zmiany</button>
                    <button className="logout-button" type="button" onClick={handleLogout}>Wyloguj się</button>
                </div>
            </form>
        </div>
    );
}
