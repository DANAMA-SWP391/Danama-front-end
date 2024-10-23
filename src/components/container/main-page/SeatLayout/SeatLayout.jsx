import "./SeatLayout.css";
import PropTypes from 'prop-types';
import Seat from "../../../common/Seat/Seat.jsx";

const SeatLayout = ({ seats, getSeatColor, handleClick }) => (

    <div className="seat-layout">
        <div className="screen">
            <div className="screen-bar"></div>
            <p>Screen</p>
        </div>
        <div className="seats">
            {seats.map((row, rowIndex) => (
                <div className="seat-row" key={rowIndex}>
                    {row.map((seat, seatIndex) => (
                        seat ? (
                            <Seat
                                seat={seat.seat}
                                status={seat.status}
                                isBooked={seat.status === 'already booked'}
                                onClick={handleClick}
                                key={seatIndex}
                                color={getSeatColor(seat.status)}
                            />
                        ) : (
                            <div className="seat space" key={seatIndex}></div>
                        )
                    ))}
                </div>
            ))}
        </div>
    </div>
);

SeatLayout.propTypes = {
    seats: PropTypes.array.isRequired,
    getSeatColor: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default SeatLayout;