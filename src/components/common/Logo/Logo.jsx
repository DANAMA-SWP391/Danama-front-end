import './Logo.css';
import {Link} from "react-router-dom";

function Logo() {
    return (
        <Link to={"/"} className="custom-link">
                <h1 className="logo">DANAMA</h1>
        </Link>

    )
}

export default Logo;