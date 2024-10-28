import './AboutUs.css';
import Logo from "../../../common/Logo/Logo.jsx";
import Booking from "../../../../assets/Icons/booking.svg";
import Location from "../../../../assets/Icons/location.svg";
import SeatIcon from "../../../../assets/Icons/seat.svg";
import Security from "../../../../assets/Icons/secure.svg";

function AboutUs() {
    return(
        <div className="about-us-section">
            <div className="intro-header">
                <Logo/>
                <h1>Book ticket at anytime, anywhere!</h1>
            </div>
            <div className="intro-text">
                <p>At DANAMA, our mission is to make movie ticket booking easy, efficient, and enjoyable. We connect you
                    with Da Nang’s cinema scene, providing an all-in-one solution for finding, comparing, and reserving
                    movie tickets.</p>
            </div>

            <div className="features-container">
                <div className="feature-item">
                    <img src={Booking} alt="Booking Icon" className="feature-icon"/>
                    <h3>We make booking easy and efficient.</h3>
                    <a href="#booking" className="feature-link">Explore Our Booking Process</a>
                </div>
                <div className="feature-item">
                    <img src={Location} alt="Location Icon" className="feature-icon"/>
                    <h3>We bring cinemas closer to you.</h3>
                    <a href="#cinemas" className="feature-link">Discover Nearby Cinemas</a>
                </div>
                <div className="feature-item">
                    <img src={SeatIcon} alt="Seat Icon" className="feature-icon"/>
                    <h3>Interactive Seat Selection</h3>
                    <a href="#seat-selection" className="feature-link">View Our Seat Selection</a>
                </div>
                <div className="feature-item">
                    <img src={Security} alt="Security Icon" className="feature-icon"/>
                    <h3>Secure Payment Options</h3>
                    <a href="#secure-payments" className="feature-link">Learn About Secure Payments</a>
                </div>
            </div>

        </div>
    );
}

export default AboutUs;