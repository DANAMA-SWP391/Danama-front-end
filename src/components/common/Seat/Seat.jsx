import './Seat.css';
import PropTypes from 'prop-types';

function Seat({ seat, onClick, key, color, price }) {
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
    key: PropTypes.number.isRequired,
    seat: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default Seat;