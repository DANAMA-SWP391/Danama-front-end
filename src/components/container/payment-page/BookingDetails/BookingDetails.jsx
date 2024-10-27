import "./BookingDetails.css";
import Button from "../../../common/Button/Button.jsx";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {WebContext} from "../../../../utils/webContext.jsx";
import {cancelBooking} from "../../../../api/userAPI.js";
import {useNavigate} from "react-router-dom";
import {checkPaymentStatus, doVNPayPayment} from "../../../../api/paymentAPI.js";
import {formatCurrency} from "../../../../utils/utility.js";

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: false
    }).format(date);
}

function formatTime(timeString) {
    const date = new Date(`1970-01-01T${timeString}`);
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
}

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
                navigate(`/booking-detail?bookingId=${bookingId}`);
            } else {
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

    const pollForPaymentCompletion = async (bookingId) => {
        const maxRetries = 60;
        let retries = 0;
        let paymentCompleted = false;

        while (!paymentCompleted && retries < maxRetries) {
            const result = await checkPaymentStatus(bookingId);
            console.log(result);

            if (result.status === 1) { // Status 1 indicates success
                paymentCompleted = true;
            } else if (result.status === 2) { // Status 2 indicates failure
                paymentCompleted = false;
                break; // Exit loop if payment has failed
            } else { // Status 0 or other indicates pending
                retries += 1;
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
            }
        }

        return paymentCompleted;
    };


    return (
        <div className={`booking-details-page ${isPaymentInProgress ? 'overlay-active' : ''}`}>
            <div className='booking-details-page__content'>
                <h2>Booking Details</h2>
                <div className="booking-details">
                    <div className="film-name">
                        <p>Film Name:</p>
                        <p>{film.name}</p>
                    </div>
                    <div className="cinema">
                        <div>
                            <div className="showtime">
                                <p>Showtime:</p>
                                <p>{formatTime(showtime.startTime)} ~ {formatTime(showtime.endTime)}</p>
                            </div>
                            <div className="date">
                                <p>Date:</p>
                                <p>{formatDateTime(showtime.showDate)}</p>
                            </div>
                        </div>
                        <div>
                            <div className="cinema-info">
                                <div className="cinema-name">
                                    <p>Cinema:</p>
                                    <p>{cinemaInfos.name}</p>
                                </div>
                                <div className="cinema-address">
                                    <p>{cinemaInfos.address}</p>
                                </div>
                            </div>
                            <div className="room">
                                <p>Room:</p>
                                <p>{showtime.room.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="seats">
                        <p>Seat(s):</p>
                        <p>{selectedSeats.map(seat => seat.seatNum).join(', ')}</p>
                    </div>
                    <div className="total-cost">
                        <p>Total Cost:</p>
                        <p>{formatCurrency(price)}</p>
                    </div>
                </div>
            </div>
            <Button onClick={handlePurchase} disabled={isPaymentInProgress}>Purchase</Button>
            <Button onClick={handleCancel} className="cancel-button" disabled={isPaymentInProgress}>Cancel
                Booking</Button>

            {isPaymentInProgress && (
                <div className="overlay">
                    <p>Please complete payment....</p>
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