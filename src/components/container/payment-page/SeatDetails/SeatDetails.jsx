
import PropTypes from "prop-types";
import "./SeatDetails.css";
function SeatDetails({ seats }) {
    return (
        <div className="seat-details">
            <p>Seats:</p>
            {seats.map(seat => (
                <div key={seat.seatId} className="seat-item">
                    <p>{seat.seatNum}</p>
                </div>
            ))}
        </div>
    );
}
SeatDetails.propTypes = {
    seats: PropTypes.arrayOf(PropTypes.shape({
        seatNum: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })).isRequired,
};

export default SeatDetails;