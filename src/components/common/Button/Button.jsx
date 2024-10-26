import "./Button.css";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Button({ onClick, className, children, to }) {
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        if (onClick) onClick();

        if (to) {
            // Check if 'to' is an external URL
            // eslint-disable-next-line react/prop-types
            if (to.startsWith("http")) {
                window.open(to, "_blank"); // Open external link in new tab
            } else {
                navigate(to); // Navigate internally
            }
        }
    };

    return (
        <button className={className} onClick={handleClick}>
            {children}
        </button>
    );
}

export default Button;
