import './BookingHistory.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function BookingHistory({ history }) {
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set the number of items per page

    // Calculate total pages
    const totalPages = Math.ceil(history.length / itemsPerPage);

    // Function to render booking status
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

    // Function to format the date
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

    // Get the current items to display based on the current page
    const currentItems = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
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
                {currentItems.map((booking) => (
                    <tr key={booking.bookingId}>
                        <td>#{booking.bookingId}</td>
                        <td>{formatDate(booking.timestamp)}</td>
                        <td>{booking.totalCost.toLocaleString()} VND</td>
                        <td>{renderStatus(booking.status)}</td>
                        <td className="details-column">
                            <button className="details-button"
                                    onClick={() => navigate(`/booking-detail?bookingId=${booking.bookingId}`)}>Details</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
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
