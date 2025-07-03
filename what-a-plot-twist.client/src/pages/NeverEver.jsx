import React, { useState } from "react";
import "../styles/NeverEver.css";
import { useNavigate } from "react-router-dom";
import { neverEverQuestions } from "../constants/neverEverQuestions";


export default function NeverEver() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [punishment, setPunishment] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("Tutaj pojawi się pytanie");
    const [currentText, setReloadText] = useState("kliknij przycisk poniżej, aby je wylosować");

    const questions = neverEverQuestions;

    const handleBack = () => {
        navigate("/home");
    };

    const handleNewQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[randomIndex]);
        setReloadText("kliknij przycisk poniżej ponownie, aby wylosować pytanie");
    };

    const closeModal = () => {
        if (punishment.length < 1) {
            alert("Dodaj karę.");
            return;
        }
        setIsModalOpen(false);

    };

    return (
        <>
            <div className="neverEver-page">
                <nav className="navbar-3">
                    <button className="back-button" onClick={handleBack}>◀</button>
                    <div className="never-ever">
                        <p>NIGDY PRZENIGDY</p>
                    </div>
                </nav>


                <main className="main-never-ever">
                    <div className="punishment-never-ever">

                        <div className="punishment-title">
                            <p>KARA</p>
                        </div>
                        <div className="punishment-container">
                            <div className="punishment-text">
                                <p>{punishment}</p>
                            </div>
                        </div>
                    </div>
                    <div className="question">
                        <div className="question-container">
                            <div className="question-text-1">
                                <p>{currentQuestion}</p>
                            </div>
                            <div className="question-text-2">
                                <p>{currentText}</p>
                            </div>

                        </div>
                        <button className="refresh-button" onClick={handleNewQuestion}>⟳</button>
                    </div>
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>KARA</h2>
                                <textarea className="square-textarea" type="text"
                                    value={punishment}
                                    onChange={(e) => setPunishment(e.target.value)}
                                    placeholder="Ustalcie wspólnie karę"
                                    maxLength={60}>
                                </textarea>

                                <div className="modal-buttons">
                                    <button className="ok-button" onClick={closeModal}>✔</button>

                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <div className="rotate-warning">
                <h3>Obróć telefon poziomo, aby kontynuować grę. </h3>
                <h1>⟳</h1>
            </div>
        </>
    );


}


