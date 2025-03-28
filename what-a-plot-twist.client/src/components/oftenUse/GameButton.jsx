import "./GameButton.css";

export default function GameButton({ children, onClick, type = "button", disabled = false }) {

    return (
        <button
            className="game-button"
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}