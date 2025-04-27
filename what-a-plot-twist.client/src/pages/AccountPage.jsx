import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountPage.css';

export default function AccountPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [photoBase64, setPhotoBase64] = useState(null);
    const [message, setMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Ładowanie zdjęcia z pamięci lokalnej (jeśli jest)
    useEffect(() => {
        const storedAvatar = localStorage.getItem('avatar');
        if (storedAvatar) {
            setPhotoBase64(storedAvatar);
        }
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024); // Rozmiar pliku w MB

            if (fileSizeInMB > 1) {
                setMessage('Plik zdjęcia jest za duży. Maksymalny rozmiar to 1 MB.');
                return; // Przerywamy dalsze przetwarzanie, jeśli plik jest za duży
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setPhotoBase64(base64String);
                localStorage.setItem('avatar', base64String); // Zapisujemy zdjęcie w pamięci lokalnej
                setMessage(''); // Czyścimy wiadomość o błędzie
            };
            reader.readAsDataURL(file);
        }
    };


    // Funkcja walidacji hasła
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!password) {
            setPasswordError('Hasło jest wymagane.');
            return false;
        } else if (password.length < 8) {
            setPasswordError('Hasło musi mieć co najmniej 8 znaków.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError('Hasło musi zawierać co najmniej 8 znaków, jedną dużą literę, jedną cyfrę i jeden znak specjalny.');
            return false;
        }
        setPasswordError(''); // Jeżeli hasło jest poprawne, usuwamy komunikat o błędzie
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja hasła przed wysłaniem formularza
        if (newPassword && !validatePassword(newPassword)) {
            return; // Jeśli hasło nie spełnia wymagań, zatrzymujemy proces
        }

        if (!username && !newPassword && !photoBase64) {
            setMessage('Wprowadź dane do zmiany.');
            return;
        }

        const oldUsername = localStorage.getItem('username');
        if (!oldUsername) {
            setMessage('Brak aktualnego loginu w pamięci lokalnej. Proszę się zalogować ponownie.');
            return;
        }

        const payload = {
            oldUsername: oldUsername,
            newUsername: username || "",
            newPassword: newPassword || "",
            newAvatar: photoBase64 || "",
        };

        try {
            const response = await fetch('https://localhost:7276/api/mongo/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage('Dane zapisane pomyślnie!');

                if (username) {
                    localStorage.setItem('username', username);
                }

                if (photoBase64) {
                    localStorage.setItem('avatar', photoBase64);
                }
            } else {
                const errorText = await response.text();
                console.error('Błąd odpowiedzi serwera:', errorText);
                setMessage('Błąd podczas zapisu danych.');
            }
        } catch (error) {
            console.error('Błąd połączenia:', error);
            setMessage('Błąd serwera.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('avatar');
        navigate('/');
    };

    return (
        <div className="account-page">
            <h1>Konto użytkownika</h1>
            {message && <p className="message">{message}</p>}

            {/* Wyświetlanie zdjęcia profilowego */}
            <div className="avatar-container">
                {photoBase64 ? (
                    <img
                        src={`data:image/jpeg;base64,${photoBase64}`}
                        alt="Avatar"
                        className="avatar"
                    />
                ) : (
                    <div className="avatar-placeholder">Brak zdjęcia</div>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    Zdjęcie profilowe:
                    <input type="file" onChange={handlePhotoChange} />
                </label>
                <label>
                    Nazwa użytkownika (opcjonalnie):
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nowa nazwa użytkownika"
                    />
                </label>
                <label>
                    Nowe hasło (opcjonalnie):
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} // Po każdej zmianie sprawdzamy hasło
                        placeholder="Nowe hasło"
                    />
                </label>
                {passwordError && <p className="error">{passwordError}</p>} {/* Wyświetlanie błędu */}
                <div className="button-row">
                    <button className="save-button" type="submit">Zapisz zmiany</button>
                    <button className="logout-button" type="button" onClick={handleLogout}>Wyloguj się</button>
                </div>
            </form>
        </div>
    );
}
