import './booking-details-page.css';
import Header from "../../components/common/Header/Header.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import {getBookingDetail} from "../../api/userAPI.js";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../utils/userContext.jsx";
import {fetchJwtToken} from "../../api/authAPI.js";

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(date);
}

function formatTime(timeString) {
    const date = new Date(`1970-01-01T${timeString}`);
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount) + 'VND';
}



function BookingDetailsPage() {
    const {user} = useContext(UserContext);
    console.log(user);
    const location = useLocation();
    const navigate = useNavigate(); // For navigation in case of error
    const [bookingDetail, setBookingDetail] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const bookingId = params.get("bookingId");

        if (!bookingId) {
            alert("Booking ID is missing in the URL.");
            navigate('/'); // Redirect to home or a relevant page
            return;
        }
        if (!user) {
            alert("You need to be logged in to view booking details.");
            navigate('/login');
        }

        async function fetchBookingDetail() {
            try {
                setLoading(true);

                // Step 2: Fetch booking details
                const data = await getBookingDetail(bookingId);
                setBookingDetail(data);

                // Step 3: Check booking ownership or cinema access
                const userData = await fetchJwtToken();

                if (user.roleId === 2) {
                    // Check if user is a cinema manager with matching cinema name
                    const cinema = localStorage.getItem('cinema');
                    if (data.cinemaName !== cinema.name) {
                        alert("You do not have access to this booking.");
                        navigate('/Cmanager');

                    }
                } else if (userData.user.email !== data.userEmail) {
                    // Check if the booking belongs to the current user
                    alert("You are not authorized to view this booking.");
                    navigate('/');

                }

            } catch (error) {
                alert("Failed to fetch booking details. " + error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBookingDetail();
    }, [location.search, navigate, user]);

    return (
        <div className="booking-details-page">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <Header />
            <div className="booking-details-page__content">
                {bookingDetail ? (
                    <>
                        <h1>Booking Information</h1>
                        <h2>Booking Details</h2>
                        <div className="booking-overview">
                            <p>ID: #{bookingDetail.bookingId}</p>
                            <p>Date: {formatDateTime(bookingDetail.bookingDate)}</p>
                            <p>User Email: {bookingDetail.userEmail}</p>
                            <p>Total Cost: {formatCurrency(bookingDetail.totalCost)}</p>
                        </div>
                        <div className="booking-details">
                            <div className="film-name">
                                <p>Film Name:</p>
                                <p>{bookingDetail.filmName}</p>
                            </div>
                            <div className="cinema">
                                <div>
                                    <div className="showtime">
                                        <p>Showtime:</p>
                                        <p>{formatTime(bookingDetail.showtimeStart)} ~ {formatTime(bookingDetail.showtimeEnd)}</p>
                                    </div>
                                    <div className="date">
                                        <p>Date:</p>
                                        <p>{bookingDetail.showtimeDate}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="cinema-info">
                                        <div className="cinema-name">
                                            <p>Cinema:</p>
                                            <p>{bookingDetail.cinemaName}</p>
                                        </div>
                                        <div className="cinema-address">
                                            <p>{bookingDetail.cinemaAddress}</p>
                                        </div>
                                    </div>
                                    <div className="room">
                                        <p>Room:</p>
                                        <p>{bookingDetail.roomName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="seats">
                                <p>Seat(s):</p>
                                <p>{bookingDetail.seatNumbers}</p>
                            </div>
                            <div className="total-cost">
                                <p>Total Cost:</p>
                                <p>{formatCurrency(bookingDetail.totalCost)}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    !loading && <p>No booking details found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default BookingDetailsPage;