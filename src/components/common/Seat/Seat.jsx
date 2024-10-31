import './Seat.css';
import PropTypes from 'prop-types';

function Seat({ seat, onClick, color, isCouple }) {
    return (
        <div
            className={`${isCouple? 'couple-seat':'seat'}`}
            onClick={color !== 'black' ? onClick : null}
            style={{ backgroundColor: color }}
        >
            {seat}
        </div>
    );
}

Seat.propTypes = {
    seat: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    isCouple: PropTypes.bool.isRequired
};

export default Seat;