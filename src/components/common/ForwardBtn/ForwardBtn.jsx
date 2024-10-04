import "./ForwardBtn.css";
import ForwardImg from "../../../assets/Icons/arrow_forward.svg";

// eslint-disable-next-line react/prop-types
function ForwardBtn({ className }) {
    return (
        <button className={`forward-btn ${className}`}>
            <img src={ForwardImg} alt="forward" />
        </button>
    );
}

export default ForwardBtn;