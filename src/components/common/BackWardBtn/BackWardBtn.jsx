import "./BackWardBtn.css";
import BackwardImg from "../../../assets/icons/arrow_back.svg";

// eslint-disable-next-line react/prop-types
function BackWardBtn({ className }) {
    return (
        <button className={`back-ward-btn ${className}`}>
            <img src={BackwardImg} alt="backward" />
        </button>
    );
}

export default BackWardBtn;