import './BookingHistory.css';
import PropTypes from 'prop-types';

function BookingHistory({ history }) {
    const renderStatus = (status) => {
        switch (status) {
            case 0:
                return "Pending";
            case 1:
                return "Confirmed";
            case 2:
                return "Cancelled";
            default:
                return "Unknown";
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-GB'); // 'en-GB' for dd/MM/yyyy
        const formattedTime = date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <table className="booking-history-table">
            <thead>
            <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th className="details-column"></th>
            </tr>
            </thead>
            <tbody>
            {history.map((booking) => (
                <tr key={booking.bookingId}>
                    <td>#{booking.bookingId}</td>
                    <td>{formatDate(booking.timestamp)}</td>
                    <td>{booking.totalCost.toLocaleString()} VND</td>
                    <td>{renderStatus(booking.status)}</td>
                    <td className="details-column">
                        <button className="details-button">Details</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

BookingHistory.propTypes = {
    history: PropTypes.arrayOf(
        PropTypes.shape({
            bookingId: PropTypes.number.isRequired,
            totalCost: PropTypes.number.isRequired,
            timestamp: PropTypes.string.isRequired,
            status: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default BookingHistory;
