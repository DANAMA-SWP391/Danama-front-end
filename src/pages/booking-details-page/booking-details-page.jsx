import  './booking-details-page.css';
import Header from "../../components/common/Header/Header.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import SeparateLine from "../../components/common/SeparateLine/SeparateLine.jsx";

function BookingDetailsPage() {
  return (
    <div className="booking-details-page">
        <Header />
        <div className="booking-details-page__content">
            <h1>Booking Information</h1>
            <h2>Booking Details</h2>

        </div>
        <Footer />
    </div>
  );
}

export default BookingDetailsPage;