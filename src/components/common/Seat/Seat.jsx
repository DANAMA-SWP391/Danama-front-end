import './Seat.css';
import PropTypes from 'prop-types';

function Seat({ seat, isBooked, onClick, status, key, color }) {
    return (
        <div
            className={`seat ${isBooked ? 'booked' : ''}`}
            onClick={onClick}
            style={{ backgroundColor: color }}
        >
            {seat}
        </div>
    );
}

Seat.propTypes = {
    seat: PropTypes.string.isRequired,
    isBooked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Seat;