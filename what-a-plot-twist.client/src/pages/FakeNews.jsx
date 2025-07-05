import React, { useState } from "react";
import "./styles/FakeNews.css";
import { useNavigate } from "react-router-dom";

const fakenews = [
    "Jaki jest Twój ulubiony film?",
    "Jakie jest Twoje największe marzenie?",
    "Co byłoby Twoim wymarzonym zawodem?",
    "Jakie jest Twoje najdziwniejsze wspomnienie?",
    "Co najbardziej cenisz w przyjaźni?",
    "Jaka jest Twoja najgorsza cecha?",
    "Co byś zmienił w swoim życiu, gdybyś miał szansę?",
    "Jakie jest Twoje największe osiągnięcie?",
    "Jaka jest Twoja najgorsza wada?",
    "Kogo podziwiasz najbardziej?"
];

const truenews = [
    "Zatańcz przez 30 sekund.",
    "Pokaż wszystkim swoje najzabawniejsze zdjęcie.",
    "Zrób 10 pompek.",
    "Zaśpiewaj swoją ulubioną piosenkę.",
    "Spróbuj zrobić 10 przysiadów bez przerwy.",
    "Zrób zdjęcie swojej twarzy z jakimś zabawnym wyrazem.",
    "Pokaż wszystkim swój taniec, który nauczyłeś się w szkole.",
    "Przebierz się w coś szalonego na 5 minut.",
    "Zadzwoń do znajomego i zaśpiewaj mu piosenkę.",
    "Zaśpiewaj i zatańcz do kawałka, który właśnie leci w tle."
];

export default function FakeNews() {
    const navigate = useNavigate();

    const [fakeText1, setFakeText1] = useState("");
    const [fakeText2, setFakeText2] = useState("");
    const [trueText, setTrueText] = useState("");

    const fetchFakeNews = () => {
        const shuffled = fakenews.sort(() => 0.5 - Math.random());
        setFakeText1(shuffled[0]);
        setFakeText2(shuffled[1]);
    };

    const fetchTrueNews = () => {
        const randomtrue = truenews[Math.floor(Math.random() * truenews.length)];
        setTrueText(randomtrue);
    };

    const handleBack = () => {
        navigate("/home");
    };

    const refreshTrueAndFakeNews = () => {
        fetchFakeNews();
        fetchTrueNews();
    };

    return (
        <div>
            <div className="fake-news-page">
                <nav className="navbar-7">
                    <button className="back-button7" onClick={handleBack}>◀</button>
                    <div className="fakeNews">
                        <p>FAKE NEWS</p>
                    </div>
                </nav>
                <main className="main-fake-news">
                    <div className="fake-news-sentence">
                        <p>{fakeText1 || "Tu pojawi się fake news"}</p>
                        <div className="fake">✖</div>
                    </div>
                    <div className="fake-news-sentence">
                        <p>{fakeText2 || "Tu pojawi się fake news"}</p>
                        <div className="fake">✖</div>
                    </div>
                    <div className="fake-news-sentence">
                        <p>{trueText || "Tu pojawi się true news"}</p>
                        <div className="true">✔</div>
                    </div>
                    <div>
                        <button className="relode-fake" onClick={refreshTrueAndFakeNews}>⟳</button>
                    </div>
                </main>
            </div>
            <div className="rotate-warning7">
                <h3>Obróć telefon poziomo, aby kontynuować grę. </h3>
                <h1>⟳</h1>
            </div>
        </div>
    );
}
