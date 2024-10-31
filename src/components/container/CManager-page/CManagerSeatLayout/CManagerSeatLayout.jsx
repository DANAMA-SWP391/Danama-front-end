import "./CManagerSeatLayout.css";
import PropTypes from 'prop-types';
import CManagerSeat from "../../../common/CManagerSeat/CManagerSeat.jsx";
import {createSeatFormat} from "../../../../utils/utility.js";

const CManagerSeatLayout = ({
                                seats,
                                selectedSeats,
                                getSeatColor,
                                handleClick,
                                numberOfRows,
                                numberOfColumns
                            }) => {
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
            <div className="cmanagerseats">
                {seatFormat.map((row, rowIndex) => {
                    // Count the number of couple seats in the row
                    const coupleSeatCount = row.filter(seat => seat && (seat.type === "Couple" || seat.type === "Selected-Couple")).length;

                    // Determine the seats to render based on the number of couple seats
                    const seatsToRender = row.slice(0, row.length - coupleSeatCount); // Ignore the last `coupleSeatCount` seats
                    return (
                        <div
                            className="seat-row"
                            key={rowIndex}
                        >
                            {seatsToRender.map((seat, seatIndex) => {
                                if (seat && (seat.type === "Couple" || seat.type === "Selected-Couple")) {
                                    // Render couple seat with 80px width
                                    return (
                                        <CManagerSeat
                                            key={seat.seatId || `${seat.row}-${seat.col}`}
                                            seat={seat.seatNum}
                                            color={getSeatColor(seat.type)}
                                            onClick={() => handleClick(seat)}
                                            isCouple={true} // Pass isCouple prop to apply couple styling
                                        />
                                    );
                                } else if (seat) {
                                    // Render regular seat with 50px width
                                    return (
                                        <CManagerSeat
                                            key={seat.seatId || `${seat.row}-${seat.col}`}
                                            seat={seat.seatNum}
                                            color={getSeatColor(seat.type)}
                                            onClick={() => handleClick(seat)}
                                            isCouple={false}
                                        />
                                    );
                                } else {
                                    // Render an empty seat as a placeholder button
                                    return (
                                        <div className='CManagerSeat-container' key={`${rowIndex}-${seatIndex}`}>
                                            <button
                                                className="empty-seat"
                                                onClick={() => handleClick({row: rowIndex + 1, col: seatIndex + 1})}
                                            >
                                                x
                                            </button>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    );
                })}
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
    blockedSeats: PropTypes.arrayOf(PropTypes.object).isRequired,
    numberOfRows: PropTypes.number.isRequired,
    numberOfColumns: PropTypes.number.isRequired,
};

export default CManagerSeatLayout;
