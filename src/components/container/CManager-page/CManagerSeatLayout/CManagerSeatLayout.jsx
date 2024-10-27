import "./CManagerSeatLayout.css";
// import  { useState } from 'react';
import PropTypes from 'prop-types';
import CManagerSeat from "../../../common/CManagerSeat/CManagerSeat.jsx";

// Create a fixed array with 6 rows (A–F) and 17 columns
const createSeatFormat = () => {
    // 6 rows and 17 columns filled with null
    return Array(6).fill(null).map(() => Array(17).fill(null));
};

// const CManagerSeatLayout = ({ seats, selectedSeats, getSeatColor, handleClick, basePrice }) => {
const CManagerSeatLayout = ({ seats, selectedSeats, getSeatColor, handleClick }) => {

    // const [selectedSeatId, setSelectedSeatId] = useState(null);

    // Create the seat format array
    const seatFormat = createSeatFormat();

    seats.forEach(seat => {
        const rowIndex = seat.row - 1;  // Adjust row to be zero-based (subtract 1)
        const colIndex = seat.col - 1;  // Adjust column to be zero-based (subtract 1)
        seatFormat[rowIndex][colIndex] = {
            ...seat,

            type: selectedSeats.some(selected => selected.row === seat.row && selected.col === seat.col)
                ? "Selected"
                : seat.type
        };
    });


    return (
        <div className="seatmanagement-layout">
            <div className="cmanager-screen">
                <div className="cmanager-screen-bar"></div>
                <p>Screen</p>
            </div>
            <div className="cmanagerseats">
                {seatFormat.map((row, rowIndex) => (
                    <div className="seat-row" key={rowIndex}>
                        {row.map((seat, seatIndex) => (
                            seat ? (
                                <CManagerSeat
                                    key={seat.seatId}
                                    seat={seat.seatNum}
                                    color={getSeatColor(seat.type)}
                                    // onClick={(action) => handleClick(seat, action)} // Pass seat and action type to handleClick
                                    onClick={() => handleClick(seat)}

                                />
                            ) : (
                                // Render empty seat blocks for places without seats
                                <button
                                    key={seatIndex}
                                    className={`empty-seat ${selectedSeats.some(s => s.row === rowIndex + 1 && s.col === seatIndex + 1) ? 'selected-seat' : ''}`}

                                    onClick={() => {
                                handleClick({row: rowIndex + 1, col: seatIndex + 1});
                            }}
                                >
                                    x
                                </button>
                            )
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

CManagerSeatLayout.propTypes = {
    seats: PropTypes.arrayOf(PropTypes.shape({
        seatId: PropTypes.number.isRequired,
        seatNum: PropTypes.string.isRequired, // A1, A2, etc.
        col: PropTypes.number.isRequired,     // Column index (starts at 1, needs to be adjusted)
        row: PropTypes.number.isRequired,     // Row index (starts at 1, needs to be adjusted)
        type: PropTypes.string.isRequired,    // Standard, VIP, Booked, etc.
    })).isRequired, // List of seat objects
    getSeatColor: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    // basePrice: PropTypes.number.isRequired, // Base price for calculating seat prices
    selectedSeats: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of selected seat numbers
};

export default CManagerSeatLayout;
