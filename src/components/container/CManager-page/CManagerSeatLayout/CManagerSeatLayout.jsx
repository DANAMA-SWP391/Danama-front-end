import "./CManagerSeatLayout.css";
import PropTypes from 'prop-types';
import CManagerSeat from "../../../common/CManagerSeat/CManagerSeat.jsx";
import { createSeatFormat } from "../../../../utils/utility.js";

const CManagerSeatLayout = ({ seats, selectedSeats, getSeatColor, handleClick, numberOfRows, numberOfColumns }) => {
    const seatFormat = createSeatFormat(numberOfRows, numberOfColumns);

    // Populate seatFormat with actual seats
    seats.forEach(seat => {
        const rowIndex = seat.row - 1;
        const colIndex = seat.col - 1;
        seatFormat[rowIndex][colIndex] = seat;
    });

    // Override or add selectedSeats in seatFormat
    selectedSeats.forEach(selectedSeat => {
        const rowIndex = selectedSeat.row - 1;
        const colIndex = selectedSeat.col - 1;
        seatFormat[rowIndex][colIndex] = selectedSeat; // Selected seats are added with their updated type
    });

    return (
        <div className="seatmanagement-layout">
            <div className="cmanager-screen">
                <div className="cmanager-screen-bar"></div>
                <p>Screen</p>
            </div>
            <div className="cmanagerseats" style={{ gridTemplateColumns: `repeat(${numberOfColumns}, 50px)` }}>
                {seatFormat.map((row, rowIndex) => (
                    <div className="seat-row" key={rowIndex}>
                        {row.map((seat, seatIndex) => (
                            seat ? (
                                <CManagerSeat
                                    key={seat.seatId || `${seat.row}-${seat.col}`}
                                    seat={seat.seatNum}
                                    color={getSeatColor(seat.type)}
                                    onClick={() => handleClick(seat)}
                                />
                            ) : (
                                <button
                                    key={seatIndex}
                                    className="empty-seat"
                                    onClick={() => handleClick({ row: rowIndex + 1, col: seatIndex + 1 })}
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
        seatId: PropTypes.number,
        seatNum: PropTypes.string,
        col: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
    })).isRequired,
    getSeatColor: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    selectedSeats: PropTypes.arrayOf(PropTypes.object).isRequired,
    numberOfRows: PropTypes.number.isRequired,
    numberOfColumns: PropTypes.number.isRequired,
};

export default CManagerSeatLayout;
