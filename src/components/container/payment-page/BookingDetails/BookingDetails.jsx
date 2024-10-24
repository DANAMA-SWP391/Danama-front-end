import "./BookingDetails.css";
import Button from "../../../common/Button/Button.jsx";
import FilmDetails from "../FilmDetails/FilmDetails.jsx";
import TimeDetails from "../TimeDetails/TimeDetails.jsx"
import CinemaDetails from "../CinemaDetails/CinemaDetails.jsx";
import SeatDetails from "../SeatDetails/SeatDetails.jsx";
import TotalDetails from "../TotalDetails/TotalsDetails.jsx";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {WebContext} from "../../../../utils/webContext.jsx";
import {cancelBooking} from "../../../../api/userAPI.js";
import {useNavigate} from "react-router-dom";
import {checkPaymentStatus, doVNPayPayment} from "../../../../api/paymentAPI.js";

function BookingDetails({bookingData, paymentMethod, bookingId}) {
    const {cinemaList} = useContext(WebContext);
    const navigate = useNavigate();
    const {film, showtime, selectedSeats, price, cinema} = bookingData;
    const cinemaInfos = cinemaList.find(c => c.cinemaId === cinema.cinemaId);

    const [isPaymentInProgress, setIsPaymentInProgress] = useState(false); // Track payment progress

    const handlePurchase = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        try {
            // Start the payment process
            setIsPaymentInProgress(true); // Enable overlay

            await doVNPayPayment(price, bookingId); // Start VNPay Payment

            // Poll for payment status
            const paymentCompleted = await pollForPaymentCompletion(bookingId);

            if (paymentCompleted) {
                alert("Payment confirmed successfully!");
                setIsPaymentInProgress(false); // Disable overlay
                navigate("/");
            }
            else
            {
                alert("Payment did not complete. Please try again.");
                setIsPaymentInProgress(false); // Disable overlay
            }
        } catch (error) {
            console.error("Error during payment:", error);
            alert("Error during payment. Please try again.");
            setIsPaymentInProgress(false); // Disable overlay
        }
    };

    const handleCancel = async () => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmCancel) return; // User chose not to cancel

        try {
            // Call the cancel booking API
            const response = await cancelBooking(bookingId);
            if (response.success) {
                alert("Booking cancelled successfully!");
                navigate("/");
            } else {
                alert("Cancellation failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during booking cancellation:", error);
            alert("Error during cancellation. Please try again.");
        }
    };

    // Polling function for payment completion
    const pollForPaymentCompletion = async (bookingId) => {
        const maxRetries = 15;
        let retries = 0;
        let paymentCompleted = false;

        while (!paymentCompleted && retries < maxRetries) {
            const result = await checkPaymentStatus(bookingId);
            console.log(result);
            if (result.success) {
                paymentCompleted = true;
            }  else {
                retries += 1;
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 3 seconds before checking again
            }
        }

        return paymentCompleted;
    };

    return (
        <div className={`body__booking-details ${isPaymentInProgress ? 'overlay-active' : ''}`}>
            <h2>Booking details</h2>
            <FilmDetails film={film}/>
            <TimeDetails showtime={showtime}/>
            <CinemaDetails cinema={cinemaInfos}/>
            <SeatDetails seats={selectedSeats}/>
            <TotalDetails totalPrice={price}/>
            <Button onClick={handlePurchase} disabled={isPaymentInProgress}>Purchase</Button>
            <Button onClick={handleCancel} className="cancel-button" disabled={isPaymentInProgress}>Cancel
                Booking</Button>

            {isPaymentInProgress && (
                <div className="overlay">
                    <p>Payment in progress... Please wait.</p>
                </div>
            )}
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