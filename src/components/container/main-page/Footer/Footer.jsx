import "./Footer.css";
import {Link} from "react-router-dom";

function Footer() {
    return(
        <div className="footer">
            <div className="quick-links">
                <h2>Quick Links</h2>
                <ul>
                    <li><Link className={"links"} to={"/"}>Home</Link></li>
                    <li><Link className={"links"} to={"/"}>Cinemas</Link></li>
                    <li><Link className={"links"} to={"/"}>Films</Link></li>
                    <li><Link className={"links"} to={"/"}>My Account</Link></li>
                </ul>
            </div>

            <div className="customer-support">
                <h2>Customer Support</h2>
                <ul>
                    <li><Link className={"links"} to={"/"}>Contact us</Link></li>
                    <li><Link className={"links"} to={"/"}>FAQs</Link></li>
                    <li><Link className={"links"} to={"/"}>Policy</Link></li>
                    <li><Link className={"links"} to={"/"}>My Account</Link></li>
                </ul>
            </div>

            <div className="about-danama">
                <h2>About Danama</h2>
                <p>Danama is a user-friendly platform that makes movie ticket booking seamless and hassle-free</p>
            </div>

            <div className="follow">
                <h2>Follow us on</h2>
                <ul>
                    <li><Link className={"links"} to={"/"}>Facebook</Link></li>
                    <li><Link className={"links"} to={"/"}>You</Link></li>
                    <li><Link className={"links"} to={"/"}>Instagram</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;