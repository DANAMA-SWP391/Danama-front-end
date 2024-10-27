


import './CManagerSeat.css';
import PropTypes from 'prop-types';

function CManagerSeat({ seat, onClick, color }) {
    return (
        <div className='CManagerSeat-container'>
            <div
                className='cmanager-seat'
                onClick={() => onClick()}  // Khi bấm ghế, gọi onClick nhưng không xử lý popup ở đây
                style={{ backgroundColor: color }}
            >
                {seat}
            </div>
        </div>
    );
}

CManagerSeat.propTypes = {
    seat: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

export default CManagerSeat;

