import { useEffect, useState } from "react";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import { fetchBookingListPage } from "../../../api/cManagerAPI.js";
import "./list-booking.css";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import {useNavigate} from "react-router-dom";

function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 20;
    const storagecinema = localStorage.getItem('cinema');
    const cinema = JSON.parse(storagecinema);
    const cinemaId = cinema.cinemaId;
    const navigate = useNavigate();

    const handleFetchBookings = async (cinemaId) => {
        setLoading(true);
        try {
            const data = await fetchBookingListPage(cinemaId);
            setBookings(data.bookings || []);
            setFilteredBookings(data.bookings || []);
        } catch (error) {
            console.error('Error fetching booking list:', error);
            setError('Could not fetch bookings.');
        }
        setLoading(false);
    };

    useEffect(() => {
        handleFetchBookings(cinemaId);
    }, [cinemaId]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSearchDate(selectedDate);

        if(selectedDate == '') {
            setFilteredBookings(bookings);
        }
        else  {
            const filtered = bookings.filter((booking) => {
                // const bookingDate = new Date(booking.timestamp).toISOString().split('T')[0];
                const bookingDate = new Date(booking.timestamp).toLocaleDateString('en-CA');
                return bookingDate === selectedDate;
            });

            setFilteredBookings(filtered);
        }
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="booking-list-page">
            {loading && (
                <div className="booking-management-loading-overlay">
                    <div className="booking-management-spinner"></div>
                </div>
            )}
            <CManagerHeader />
            <div className="layout">
                <Sidebar />
                <div className="booking-list-content">
                    <h2 className="booking-title">BOOKINGS LIST</h2>
                    <div className="search-container">
                        <input
                            type="date"
                            value={searchDate}
                            onChange={handleDateChange}
                            placeholder="Search by Date"
                        />
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            <table className="booking-table">
                                <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>User ID</th>
                                    <th>Date</th>
                                    <th>Total Cost</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentBookings.length > 0 ? (
                                    // filteredBookings.map((booking) => (
                                currentBookings.map((booking) => (

                                    <tr key={booking.bookingId}>
                                            <td>{booking.bookingId}</td>
                                            <td>{booking.user ? booking.user.UID : 'N/A'}</td>
                                            <td>
                                                {booking.timestamp
                                                    ? new Date(booking.timestamp).toLocaleDateString('vi-VN')
                                                    : 'N/A'}
                                            </td>
                                            <td>{booking.totalCost ? booking.totalCost.toLocaleString('vi-VN') : 0} VND</td>
                                            <td>{booking.status}</td>
                                            <td className='details-btn' onClick={() => navigate(`/booking-detail?bookingId=${booking.bookingId}`)}>Details</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No bookings found for this date.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <div className="pagination">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={currentPage === 1 ? 'disabled' : ''}
                                >
                                    &laquo;
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={currentPage === totalPages ? 'disabled' : ''}
                                >
                                    &raquo;
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingList;
