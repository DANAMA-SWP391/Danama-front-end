import "./BookingDetails.css";
import Button from "../../../common/Button/Button.jsx";
import FilmDetails from "../FilmDetails/FilmDetails.jsx";
import TimeDetails from "../TimeDetails/TimeDetails.jsx"
import CinemaDetails from "../CinemaDetails/CinemaDetails.jsx";
import SeatDetails from "../SeatDetails/SeatDetails.jsx";
import TotalDetails from "../TotalDetails/TotalsDetails.jsx";
import PropTypes from "prop-types";
import {useContext} from "react";
import {WebContext} from "../../../../utils/webContext.jsx";
import {paymentConfirm} from "../../../../api/userAPI.js";

function BookingDetails({ bookingData, paymentMethod, bookingId }) {
    const {cinemaList} = useContext(WebContext);
    const { film, showtime, selectedSeats, price, cinema } = bookingData;
    const cinemaInfos = cinemaList.find(c => c.cinemaId === cinema.cinemaId);
    const handlePurchase = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        try {
            // Call the payment confirm API
            const response = await paymentConfirm(bookingId);
            if (response.success) {
                alert("Payment confirmed successfully!");
                // Optionally, navigate or perform any other actions post payment
            } else {
                alert("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during payment:", error);
            alert("Error during payment. Please try again.");
        }
    };
    return (
        <div className="body__booking-details">
            <h2>Booking details</h2>
            <FilmDetails film={film} />
            <TimeDetails showtime={showtime} />
            <CinemaDetails cinema={cinemaInfos} />
            <SeatDetails seats={selectedSeats} />
            <TotalDetails totalPrice={price} />
            <Button onClick={handlePurchase}>Purchases</Button>
        </div>
    );
}
BookingDetails.propTypes = {
    bookingData: PropTypes.shape({
        film: PropTypes.object.isRequired,
        showtime: PropTypes.object.isRequired,
        selectedSeats: PropTypes.array.isRequired,
        price: PropTypes.number.isRequired,
        cinema: PropTypes.object.isRequired,
        room: PropTypes.object.isRequired,
    }).isRequired,
    paymentMethod: PropTypes.string.isRequired,
    bookingId: PropTypes.number.isRequired,
};
export default BookingDetails;