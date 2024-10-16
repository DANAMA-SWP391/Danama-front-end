import { useEffect, useState } from "react";
import Header from "../../../components/common/Header/Header.jsx"; // Đường dẫn phải chính xác
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import { fetchBookingListPage } from "../../../api/cManagerAPI.js";
import "./list-booking.css";

function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]); // Thêm state để lưu danh sách bookings đã lọc
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchDate, setSearchDate] = useState('');

    const cinemaId = 1; // Đảm bảo cinemaId hợp lệ

    const handleFetchBookings = async (cinemaId) => {
        setLoading(true);
        try {
            const data = await fetchBookingListPage(cinemaId);
            setBookings(data.bookings || []);
            setFilteredBookings(data.bookings || []); // Gán bookings từ data
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
        const selectedDate = e.target.value; // Lưu ngày được chọn
        setSearchDate(selectedDate);
        console.log("Search Date:", selectedDate);

        // Lọc bookings theo ngày
        if(selectedDate == '') {
            setFilteredBookings(bookings);
        }
        else  {
            const filtered = bookings.filter((booking) => {
                const bookingDate = new Date(booking.timestamp).toISOString().split('T')[0];
                return bookingDate === selectedDate;
            });

            setFilteredBookings(filtered); // Cập nhật filteredBookings
        }
    };

    return (
        <div className="booking-list-page">
            <Header />
            <div className="layout"> {/* Thêm div chứa cho sidebar và nội dung */}
                <Sidebar />
                <div className="booking-list-content">
                    <h2 className="booking-title">BOOKINGS LIST</h2>
                    <div className="search-container">
                        <input
                            type="date"
                            value={searchDate}
                            onChange={handleDateChange} // Thay đổi onChange để gọi handleDateChange
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
                                </tr>
                                </thead>
                                <tbody>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking.bookingId}>
                                            <td>{booking.bookingId}</td>
                                            <td>{booking.user ? booking.user.UID : 'N/A'}</td>
                                            <td>
                                                {booking.timestamp
                                                    ? new Date(booking.timestamp).toLocaleDateString('vi-VN')
                                                    : 'N/A'}
                                            </td>
                                            <td>{booking.totalCost ? booking.totalCost.toLocaleString('vi-VN') : 0} VND</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No bookings found for this date.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingList;
