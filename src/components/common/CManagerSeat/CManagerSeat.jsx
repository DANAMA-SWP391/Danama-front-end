import './CManagerSeat.css';
import PropTypes from 'prop-types';

function CManagerSeat({ seat, onClick, color, isCouple }) {
    return (
        <div className='CManagerSeat-container'>
            <div
                className={`cmanager-seat ${isCouple ? 'couple-long-seat' : ''} `}
                onClick={() => onClick()}
                style={{ backgroundColor: color }}
            >
                {seat}
            </div>
        </div>
    );
}

CManagerSeat.propTypes = {
    seat: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    color: PropTypes.string.isRequired,
    isCouple: PropTypes.bool, // New prop to indicate if this is a couple long seat
    isBlocked:PropTypes.bool
};

CManagerSeat.defaultProps = {
    isCouple: false,
    isBlocked: false
};

export default CManagerSeat;
