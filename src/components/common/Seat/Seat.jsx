import './Seat.css';
import PropTypes from 'prop-types';

function Seat({ seat, onClick, color, price }) {
    return (
        <div
            className='seat'
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
    price: PropTypes.number.isRequired
};

export default Seat;