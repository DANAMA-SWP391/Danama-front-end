import  "./TimeDetails.css";
import PropTypes from "prop-types";
import { parse, format } from 'date-fns';
function TimeDetails({ showtime }) {
    // Parse the showDate using date-fns
    const parsedDate = parse(showtime.showDate, 'MMM d, yyyy', new Date());

    // Format the parsed date to be displayed
    const formattedDate = format(parsedDate, 'MMMM d, yyyy'); // e.g., "October 4, 2024"

    return (
        <div className="time-details">
            <p>{`${showtime.startTime} ~ ${showtime.endTime}`}</p>
            <p>{formattedDate}</p>
            <p>Room: {showtime.room.name}</p>
        </div>
    );
}
TimeDetails.propTypes = {
    showtime: PropTypes.object.isRequired,
};

export default TimeDetails;