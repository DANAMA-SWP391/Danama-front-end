import "./ForwardBtn.css";
import ForwardImg from "../../../assets/Icons/arrow_forward.svg";

// eslint-disable-next-line react/prop-types
function ForwardBtn({ className, onClick }) {
    return (
        <button className={`forward-btn ${className}`} onClick={onClick} >
            <img src={ForwardImg} alt="forward" />
        </button>
    );
}

export default ForwardBtn;