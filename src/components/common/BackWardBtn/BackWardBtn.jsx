import "./BackWardBtn.css";
import BackwardImg from "../../../assets/Icons/arrow_back.svg";

// eslint-disable-next-line react/prop-types
function BackWardBtn({ className , onClick}) {
    return (
        <button className={`back-ward-btn ${className}`} onClick={onClick}>
            <img src={BackwardImg} alt="backward" />
        </button>
    );
}

export default BackWardBtn;