import './ResetPassLink.css';
import {Link} from "react-router-dom";

function ResetPassLink() {
    return (
        <p className="reset-password">
            <Link to="/reset-pass" className="custom-link">Forgot Password?</Link>
        </p>
    )
}

export default ResetPassLink;