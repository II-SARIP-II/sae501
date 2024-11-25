import "../styles/Button.css";

function Button({ label, onClick }) {
    return (
        <button className={"boutonclassique"} onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;
