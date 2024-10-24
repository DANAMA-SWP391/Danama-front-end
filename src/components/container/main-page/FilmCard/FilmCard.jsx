import PropTypes from 'prop-types';
import "./FilmCard.css";
import SeatLayout from "../SeatLayout/SeatLayout.jsx";
import BookingInfo from "../BookingInfo/BookingInfo.jsx";
import BackSpace from '../../../../assets/Icons/back-space.svg';
import {useEffect, useState} from "react";
import {fetchDetailShowtime} from "../../../../api/webAPI.jsx";
import {fetchJwtToken} from "../../../../api/authAPI.js";
import {addBooking} from "../../../../api/userAPI.js";
import {useNavigate} from "react-router-dom";

function FilmCard({film, showtimes}) {
    const [isClick, setIsClick] = useState(false);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(false);
    const seatsInfo = [
        ["Booked", "black"], ["Selected", "#BCB3B3"], ["Standard", "#1BA0D4"], ["VIP", "#D64242"]
    ];
    const [price, setPrice] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showtime, setShowtime] =useState({});
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // Fetch user info once when the component loads
    useEffect(() => {
        const validateToken = async () => {
            try {
                const result = await fetchJwtToken(); // Validate token and get user info
                if (result.success) {
                    setUser(result.user); // Set user info
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        validateToken();
    }, []);
    const handleSelectedShowtime = async (showtime) => {
        if (!user) {
            // Nếu người dùng chưa đăng nhập, điều hướng tới trang đăng nhập
            alert('Please log in to select seats.');
            navigate('/login');
            return; // Ngăn không cho tiếp tục nếu chưa đăng nhập
        }

        setShowtime(showtime);
        setIsClick(true);
        setLoading(true); // Start loading state
        try {
            // Fetch seat details from API
            const response = await fetchDetailShowtime(showtime.showtimeId, showtime.room.roomId);
            if (response) {
                const { seats } = response; // Assuming response contains seats as an array
                setSeats(seats); // Update seats with 2D grid
            }
        } catch (error) {
            console.error("Error fetching showtime details:", error);
        } finally {
            setLoading(false); // End loading state after fetch is complete
        }
    };
    const handleClick =() => {
        setIsClick(!isClick);
        setSeats([]);
        setSelectedSeats([]);
        setPrice(0);
    }
    // Function to handle seat selection (add or remove)
    const handleSelectSeat = (seat) => {
        // Check if the seat is already selected
        const isAlreadySelected = selectedSeats.some(selectedSeat => selectedSeat.seatNum === seat.seatNum);

        if (isAlreadySelected) {
            // Remove seat from selectedSeats
            setSelectedSeats(selectedSeats.filter(s => s.seatNum !== seat.seatNum));
            setPrice(price - seat.price); // Decrease price by seat price
        } else {
            // Add seat to selectedSeats
            setSelectedSeats([...selectedSeats, seat]); // Store full seat object including price
            setPrice(price + seat.price); // Increase price by seat price
        }
    };
    const getSeatColor = (type) => {
        switch (type) {
            case 'Booked': return 'black';
            case 'Selected': return '#BCB3B3';
            case 'VIP': return '#D64242';
            default: return '#1BA0D4';
        }
    };
    const handlePurchase = async () => {
        try {
            // Create booking object
            const bookingData = {
                user: { UID: user.UID },
                totalCost: price,
                timestamp: new Date().toISOString(), // Set current timestamp
                status: 0, // Initial status
            };

            // Create ticket objects for each selected seat
            const tickets = selectedSeats.map(seat => ({
                price: seat.price,
                name: user.name, // Assuming you will pass the user name
                email: user.email, // Assuming you have user email
                phone: user.phone, // Assuming you have user phone
                showtime: { showtimeId: showtime.showtimeId },
                seat: { seatId: seat.seatId }
            }));

            // Send booking and tickets to backend
            const response = await addBooking(bookingData, tickets);

            if (response.success) {
                // Navigate to the payment page with bookingId and booking details
                navigate('/payment', {
                    state: {
                        bookingId: response.bookingId,
                        bookingData: {
                            film,
                            showtime,
                            selectedSeats,
                            price,
                            cinema: showtime.room.cinema,
                        }
                    }
                });
            } else {
                alert('Booking failed');
                console.error('Booking failed');
            }
        } catch (error) {
            console.error('Error during booking creation:', error);
        }
    };
    return (
        <div className={`wrapper ${isClick ? 'darken' : ''}`}>
            {isClick && <div className="overlay"></div>}
            {isClick && (
                <div className="book-ticket-container">
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div> {/* Spinner instead of text */}
                        </div>
                    )}
                    <img src={BackSpace} alt="back-space" onClick={handleClick}/>
                    <h2>Book Ticket</h2>

                    <SeatLayout selectedSeats={selectedSeats} handleClick={handleSelectSeat} getSeatColor={getSeatColor} seats={seats} basePrice={showtime.basePrice} />

                    <div className="seats-info">
                        {seatsInfo.map((info, index) => (
                            <div className="info" key={index}>
                                <div className="color" style={{ backgroundColor: info[1] }}></div>
                                <p>{info[0]}</p>
                            </div>
                        ))}
                    </div>
                    <BookingInfo price={price} selectedSeats={selectedSeats} handlePurchase={handlePurchase} film={film}  showtime={showtime} />
                </div>
            )}
            <div className="schedule-film">
                <img src={film.poster} alt="film poster"/>
                <div className="film-info">
                    <p className="film-age">{film.ageRestricted}+</p>
                    <p className="film-name">{film.name}</p>
                    <p className="film-genre">{film.genre}</p>
                    <div className="film-schedule">
                        {showtimes.map((showtime, index) => (
                            <div key={index} className="showtime" onClick={() => handleSelectedShowtime(showtime)}>
                                {/* Display the startTime and endTime exactly as they are without conversion */}
                                <p >{showtime.startTime} ~ {showtime.endTime}</p>
                                <p >Price: {showtime.basePrice}đ</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

FilmCard.propTypes = {
    film: PropTypes.shape({
        poster: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ageRestricted: PropTypes.number.isRequired, // Ensure it's a number as you mentioned
        genre: PropTypes.string.isRequired,
    }).isRequired,
    showtimes: PropTypes.arrayOf(PropTypes.shape({
        startTime: PropTypes.string.isRequired, // String in HH:mm:ss format
        endTime: PropTypes.string.isRequired,   // String in HH:mm:ss format
        basePrice: PropTypes.number.isRequired, // Price in number format
    })).isRequired
};

export default FilmCard;
