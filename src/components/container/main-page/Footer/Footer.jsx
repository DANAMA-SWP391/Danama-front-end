import "./Footer.css";
import {Link} from "react-router-dom";

function Footer() {
    return(
        <div className="footer">
            <div className="quick-links">
                <h2>Quick Links</h2>
                <ul>
                    <li><Link className={"links"} to={"/"}>Home</Link></li>
                    <li><Link className={"links"} to={"/"}>Schedules</Link></li>
                    <li><Link className={"links"} to={"/film-list"}>Films</Link></li>
                    <li><Link className={"links"} to={"/profile"}>My Account</Link></li>
                </ul>
            </div>

            <div className="customer-support">
                <h2>Customer Support</h2>
                <ul>
                    <li><Link className={"links"} to={"/"}>Contact us</Link></li>
                    <li><Link className={"links"} to={"/"}>FAQs</Link></li>
                    <li><Link className={"links"} to={"/"}>Policy</Link></li>
                    <li><Link className={"links"} to={"/profile"}>My Account</Link></li>
                </ul>
            </div>

            <div className="about-danama">
                <h2>About DANAMA</h2>
                <p>DANAMA is a user-friendly platform that makes movie ticket booking seamless and hassle-free</p>
            </div>

            <div className="follow">
                <h2>Follow DANAMA on</h2>
                <ul>
                    <li><Link className={"links"} to={"/"}>Facebook</Link></li>
                    <li><Link className={"links"} to={"/"}>danamawebsite@gmail.com</Link></li>
                    <li><Link className={"links"} to={"/"}>Instagram</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;