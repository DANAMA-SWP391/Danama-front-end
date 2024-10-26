import PropTypes from 'prop-types';
import "./BookingInfo.css";
import Button from "../../../common/Button/Button.jsx";

const BookingInfo = ({ film, showtime, selectedSeats, handlePurchase, price }) => (
    <div className="booking-info">
        {/* Film information */}
        <div className="film-info">
            <div className="head">
                <div className="age"><p>{film.ageRestricted}+</p></div> {/* Display film age restriction */}
                <div className="film-name"><p>{film.name}</p></div> {/* Film name */}
            </div>
            <div className="body">
                <p>{showtime.startTime} ~ {showtime.endTime}</p> {/* Showtime */}
                <p>{new Date(showtime.showDate).toLocaleDateString()}</p> {/* Show date */}
                <p>{showtime.room.name}</p> {/* Room information */}
            </div>
        </div>

        {/* Seat information */}
        <div className="seat-infos">
            <p>Seat: </p>
            <div className="seat-list">
                {selectedSeats && selectedSeats.length > 0 ? (
                    selectedSeats.map((seat, index) => (
                        <div key={index} className="seat-item">
                            <p>{seat.seatNum}</p> {/* Display seat number */}
                        </div>
                    ))
                ) : (
                    <p></p>// Display message if no seats are selected
                )}
            </div>
        </div>

        {/* Price information */}
        <div className="price">
            <p>Total Price: {price.toLocaleString()}đ</p> {/* Display total price */}
        </div>

        {/* Purchase button */}
        <Button onClick={handlePurchase}>Purchase</Button>
    </div>
);

BookingInfo.propTypes = {
    film: PropTypes.shape({
        ageRestricted: PropTypes.number.isRequired, // Age restriction as a number
        name: PropTypes.string.isRequired,          // Film name
    }).isRequired,
    showtime: PropTypes.shape({
        startTime: PropTypes.string.isRequired, // Showtime start time
        endTime: PropTypes.string.isRequired,   // Showtime end time
        showDate: PropTypes.string.isRequired,  // Showtime date
        room: PropTypes.shape({
            name: PropTypes.string.isRequired,  // Room name
        }).isRequired
    }).isRequired,
    selectedSeats: PropTypes.arrayOf(PropTypes.shape({
        seatNum: PropTypes.string.isRequired, // Seat number
    })).isRequired, // List of selected seat numbers
    handlePurchase: PropTypes.func.isRequired,            // Purchase handler
    price: PropTypes.number.isRequired                             // Total price of the selected seats
};

export default BookingInfo;
