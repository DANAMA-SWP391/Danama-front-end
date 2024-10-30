import "./SeatLayout.css";
import PropTypes from 'prop-types';
import Seat from "../../../common/Seat/Seat.jsx";
import {createSeatFormat} from "../../../../utils/utility.js";

const SeatLayout = ({ seats, selectedSeats, getSeatColor, handleClick, basePrice, numberOfColumns, numberOfRows }) => {
    // Create the seat format array
    const seatFormat = createSeatFormat(numberOfRows, numberOfColumns);

    const isSelected = (seatNum) => {
        return selectedSeats.some(selectedSeat => selectedSeat.seatNum === seatNum);
    };

    const getSeatPrice = (seatType) => {
        switch (seatType) {
            case 'Couple': return basePrice * 2;
            case 'VIP': return basePrice + 20000;
            case 'Standard': return basePrice;
            default: return basePrice;
        }
    };

    // Fill the seat format with actual fetched seats based on `col` and `row`
    seats.forEach(seat => {
        const rowIndex = seat.row - 1;  // Adjust row to be zero-based (subtract 1)
        const colIndex = seat.col - 1;  // Adjust column to be zero-based (subtract 1)

        // Check if the seat is selected and if it's a couple seat
        const isSeatSelected = isSelected(seat.seatNum);
        const seatType = isSeatSelected ? "Selected" : seat.type;
        const isCouple = seat.type === 'Couple' || seat.type === 'Booked-Couple';

        seatFormat[rowIndex][colIndex] = {
            ...seat,
            price: getSeatPrice(seat.type), // Calculate the price for each seat
            type: seatType,                 // Use updated type, "Selected" if selected
            isCouple: isCouple || (seatType === "Selected" && isCouple) // Keep isCouple true for selected couple seats
        };
    });

    return (
        <div className="seat-layout">
            <div className="screen">
                <div className="screen-bar"></div>
                <p>Screen</p>
            </div>
            <div className="seats">
                {seatFormat.map((row, rowIndex) => {
                    // Count the number of couple seats in the row based on the `isCouple` property
                    const coupleSeatCount = row.filter(seat => seat && seat.isCouple).length;

                    // Determine the seats to render by slicing off the last `coupleSeatCount` seats
                    const seatsToRender = row.slice(0, row.length - coupleSeatCount);

                    return (
                        <div className="seat-row" key={rowIndex}>
                            {seatsToRender.map((seat, seatIndex) => (
                                seat ? (
                                    <Seat
                                        key={seatIndex}
                                        seat={seat.seatNum}
                                        onClick={() => handleClick(seat)} // Handle seat click
                                        color={getSeatColor(seat.type)} // Use updated type for seat color
                                        isCouple={seat.isCouple} // Pass isCouple property
                                    />
                                ) : (
                                    // Render white block for empty spaces
                                    <div key={seatIndex} className="seat space"> x</div>
                                )
                            ))}
                        </div>
                    );
                })}
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
    numberOfColumns: PropTypes.number.isRequired,
    numberOfRows: PropTypes.number.isRequired
};

export default SeatLayout;
