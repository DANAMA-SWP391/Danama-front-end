import "./Footer.css";
import { Link } from "react-router-dom";
import {useContext} from "react";
import {WebContext} from "../../../../utils/webContext.jsx";

function Footer() {
    // Access cinemaList from WebContext
    const { cinemaList } = useContext(WebContext);

    return (
        <div className="footer">
            <div className="quick-links">
                <h2>Quick Links</h2>
                <ul>
                    <li><Link className="links" to="/">Home</Link></li>
                    <li><Link className="links" to="/schedules">Schedules</Link></li>
                    <li><Link className="links" to="/film-list">Films</Link></li>
                    <li><Link className="links" to="/profile">My Account</Link></li>
                </ul>
            </div>

            <div className="cinema-partner">
                <h2>Cinema Partner</h2>
                <ul>
                    {cinemaList && cinemaList.map((cinema) => (
                        <li key={cinema.cinemaId}>
                            <Link className="links" to={`/`}>
                                {cinema.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="about-danama">
                <h2>About DANAMA</h2>
                <p>DANAMA is a user-friendly platform that makes movie ticket booking seamless and hassle-free.</p>
            </div>

            <div className="follow">
                <h2>Follow DANAMA on</h2>
                <ul>
                    <li><Link className="links" to="https://www.facebook.com/nguyenvan.duythang">Facebook</Link></li>
                    <li><Link className="links" to="/">danamawebsite@gmail.com</Link></li>
                    <li><Link className="links" to="/">Instagram</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
