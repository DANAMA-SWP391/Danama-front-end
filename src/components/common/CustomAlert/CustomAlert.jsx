import "./CustomAlert.css"
import PropTypes from "prop-types";

const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert">
            <span className="close-btn" onClick={onClose}>×</span>
            <p>{message}</p>
        </div>
    );
};

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired, // Ensure message is a required string
    onClose: PropTypes.func.isRequired,   // Ensure onClose is a required function
};

export default CustomAlert;