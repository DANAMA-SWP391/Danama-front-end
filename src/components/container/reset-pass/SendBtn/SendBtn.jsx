import './SendBtn.css';
import Button from "../../../common/Button/Button.jsx";
import PropTypes from "prop-types";

function SendBtn({onClick}) {
    return (
        <Button onClick ={onClick} className="send-btn">Send</Button>
    )
}

SendBtn.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SendBtn;