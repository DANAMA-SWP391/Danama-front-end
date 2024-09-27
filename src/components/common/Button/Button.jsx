import { useNavigate } from "react-router-dom";

import "./Button.css";

// eslint-disable-next-line react/prop-types
function Button({ className, children, to }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(to);
    };
    return (
        <button className={className} onClick={handleClick}>
            {children}
        </button>
    );
}

export default Button;