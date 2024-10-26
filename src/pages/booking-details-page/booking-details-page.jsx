import './booking-details-page.css';
import Header from "../../components/common/Header/Header.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";

function BookingDetailsPage() {
    return (
        <div className="booking-details-page">
            <Header />
            <div className="booking-details-page__content">
                <h1>Booking Information</h1>
                <h2>Booking Details</h2>
                <div className="booking-overview">
                    <p>ID: #001 </p>
                    <p>Date: 21/09/2024 </p>
                    <p>User Email: giangtnde180133@fpt.edu.vn</p>
                    <p>Total Cost: 100.000đ</p>
                </div>
                <div className="booking-details">
                    <div className="film-name">
                        <p>Film Name:</p>
                        <p>Fast and Furious 9</p>
                    </div>
                    <div className="cinema">
                        <div>
                            <div className="showtime">
                                <p>Showtime:</p>
                                <p>14:00 ~ 15:30</p>
                            </div>
                            <div className="date">
                                <p>Date:</p>
                                <p>21/09/2024</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="cinema-name">
                                    <p>Cinema:</p>
                                    <p>CGV Vincom Center</p>
                                </div>
                                <div className="cinema-address">
                                    <p>Level 4 - Vincom Da Nang Shopping Mall,Ngo Quyen Street - An Hai Bac Ward - Son
                                        Tra District Dà Nang</p>
                                </div>
                            </div>
                            <div className="room">
                                <p>Room:</p>
                                <p>Room 1</p>
                            </div>
                        </div>
                    </div>
                    <div className="seats">
                        <p>Seat:</p>
                        <p>A1, A2, A3</p>
                    </div>
                    <div className="total-cost">
                        <p>Total Cost:</p>
                        <p>100.000đ</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookingDetailsPage;