import "./SeatLayout.css";
import PropTypes from 'prop-types';
import Seat from "../../../common/Seat/Seat.jsx";

// Create a fixed array with 6 rows (A–F) and 17 columns
const createSeatFormat = () => {
     // 6 rows and 17 columns filled with null
    return Array(6).fill(null).map(() => Array(17).fill(null));
};

const SeatLayout = ({ seats, selectedSeats, getSeatColor, handleClick, basePrice }) => {
    // Create the seat format array
    const seatFormat = createSeatFormat();
    const isSelected = (seatNum) => {
        return selectedSeats.some(selectedSeat => selectedSeat.seatNum === seatNum);
    };
    const getSeatPrice = (seatType) => {
        switch (seatType) {
            case 'VIP': return basePrice * 1.5; // VIP seats are 50% more expensive
            case 'Standard': return basePrice; // Standard seats use base price
            default: return basePrice; // Default to base price for other seat types
        }
    };
    // Fill the seat format with actual fetched seats based on `col` and `row`
    seats.forEach(seat => {
        const rowIndex = seat.row - 1;  // Adjust row to be zero-based (subtract 1)
        const colIndex = seat.col - 1;  // Adjust column to be zero-based (subtract 1)
        seatFormat[rowIndex][colIndex] = {
            ...seat,
            price: getSeatPrice(seat.type), // Calculate the price for each seat
            type: isSelected(seat.seatNum) ? "Selected" : seat.type // Mark seat as selected
        };
    });
    console.log(seatFormat);
    return (
        <div className="seat-layout">
            <div className="screen">
                <div className="screen-bar"></div>
                <p>Screen</p>
            </div>
            <div className="seats">
                {seatFormat.map((row, rowIndex) => (
                    <div className="seat-row" key={rowIndex}>
                        {row.map((seat, seatIndex) => (
                            seat ? (
                                <Seat
                                    key={seatIndex}
                                    seat={seat.seatNum}
                                    price={seat.price} // Pass seat price
                                    onClick={() => handleClick(seat)} // Handle seat click
                                    color={getSeatColor(seat.type)} // Use updated `type` for seat color (including "Selected")
                                />
                            ) : (
                                // Render white block for empty spaces
                                <div key={seatIndex} className="seat space"> x</div>
                            )
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

SeatLayout.propTypes = {
    seats: PropTypes.arrayOf(PropTypes.shape({
        seatId: PropTypes.number.isRequired,
        seatNum: PropTypes.string.isRequired, // A1, A2, etc.
        col: PropTypes.number.isRequired,     // Column index (starts at 1, needs to be adjusted)
        row: PropTypes.number.isRequired,     // Row index (starts at 1, needs to be adjusted)
        type: PropTypes.string.isRequired,    // Standard, VIP, Booked, etc.
    })).isRequired, // List of seat objects
    getSeatColor: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    basePrice: PropTypes.number.isRequired, // Base price for calculating seat prices
    selectedSeats: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of selected seat numbers
};

export default SeatLayout;
