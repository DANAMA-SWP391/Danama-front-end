import PropTypes from 'prop-types';
import "./Date.css";

function ScheduleDate({ date, onClick, selected }) {
    return (
        <div
            className={`date-box ${selected ? 'selected' : ''}`} // Conditionally apply 'selected' class
            onClick={onClick}
        >
            <p className="day">{date[0]}</p> {/* Display day of the week */}
            <p className="date">{date[1]}</p> {/* Display the day (dd) */}
        </div>
    );
}

ScheduleDate.propTypes = {
    date: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,  // For day of the week (e.g., 'Mon')
        PropTypes.number   // For date (e.g., 04)
    ])).isRequired,
    onClick: PropTypes.func.isRequired,  // Function to handle click
    selected: PropTypes.bool.isRequired  // Prop to indicate if this date is selected
};

export default ScheduleDate;
