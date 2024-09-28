import "./Button.css";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Button({onClick, className, children, to}) {
    const navigate = useNavigate();
    const handleCLick = (event) => {
        event.preventDefault();
        if(onClick) onClick();
        if(to) navigate(to);
    }
    return (
        <button className={className} onClick={handleCLick}>
            {children}
        </button>
    );
}

export default Button;