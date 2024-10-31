import PropTypes, {object} from 'prop-types';
import "./FilmCard.css";
import SeatLayout from "../SeatLayout/SeatLayout.jsx";
import BookingInfo from "../BookingInfo/BookingInfo.jsx";
import BackSpace from '../../../../assets/Icons/back-space.svg';
import {useState} from "react";
import {fetchDetailShowtime} from "../../../../api/webAPI.jsx";
import {fetchJwtToken} from "../../../../api/authAPI.js";
import {addBooking} from "../../../../api/userAPI.js";
import {useNavigate} from "react-router-dom";
import {useCustomAlert} from "../../../../utils/CustomAlertContext.jsx";
import {checkShowtimeValid, formatCurrency} from "../../../../utils/utility.js";

function FilmCard({film, showtimes}) {
    const showAlert = useCustomAlert();
    const [isClick, setIsClick] = useState(false);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(false);
    const seatsInfo = [
        ["Booked", "black"], ["Selected", "#BCB3B3"], ["Standard", "#1BA0D4"], ["VIP", "#D64242"], ['Couple','#FFD700']
    ];
    const [price, setPrice] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showtime, setShowtime] = useState({});
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const handleSelectedShowtime = async (showtime) => {
        setIsClick(true);
        setShowtime(showtime);
        setLoading(true);
        if (!user) {
            try {
                const result = await fetchJwtToken(); // Fetch user info by validating token
                if (result.success) {
                    if (result.user.roleId === 1 || result.user.roleId === 2) {
                        showAlert("You do not have permission to select seats.");
                        setLoading(false);
                        setIsClick(false);
                        return;
                    }
                    setUser(result.user);
                } else {
                    showAlert('Please log in to select seats.');
                    navigate('/login');
                    return; // Exit if user not logged in
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                return;
            }
        }

        try {
            const response = await fetchDetailShowtime(showtime.showtimeId, showtime.room.roomId);
            if (response) {
                setSeats(response.seats);
            }
        } catch (error) {
            console.error("Error fetching showtime details:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleClick = () => {
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
            case 'Couple':
                return '#FFD700';
            case 'Booked':
                return 'black';
            case 'Booked-Couple':
                return 'black';
            case 'Selected':
                return '#BCB3B3';
            case 'VIP':
                return '#D64242';
            default:
                return '#1BA0D4';
        }
    };
    const handlePurchase = async () => {
        if(selectedSeats?.length === 0) {
            showAlert("Please choose a seat before purchase!!");
            return;
        }
        setLoading(true);
        try {
            const bookingData = {
                user: {UID: user.UID},
                totalCost: price,
                timestamp: new Date().toISOString(),
                status: 0,
            };

            const tickets = selectedSeats.map(seat => ({
                price: seat.price,
                name: user.name,
                email: user.email,
                phone: user.phone,
                showtime: {showtimeId: showtime.showtimeId},
                seat: {seatId: seat.seatId},
            }));

            const response = await addBooking(bookingData, tickets);

            if (response.success) {
                navigate('/payment', {
                    state: {
                        bookingId: response.bookingId,
                        bookingData: {
                            film,
                            showtime,
                            selectedSeats,
                            price,
                            cinema: showtime.room.cinema,
                        },
                    },
                });
                window.scrollTo(0, 0);
            } else {
                showAlert(response.error || 'Booking failed');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error during booking creation:', error);
            showAlert('An error occurred while processing your booking.');
            setLoading(false);
        }
    };
    return (
        <div className={`wrapper ${isClick ? 'darken' : ''}`}>
            {isClick && <div className="overlay"></div>}
            {isClick && (
                <div className="book-ticket-container">
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                            {/* Spinner instead of text */}
                        </div>
                    )}
                    <img src={BackSpace} alt="back-space" onClick={handleClick}/>
                    <h2>Book Ticket</h2>

                    <SeatLayout selectedSeats={selectedSeats} handleClick={handleSelectSeat} getSeatColor={getSeatColor}
                                seats={seats} basePrice={showtime.basePrice} numberOfColumns={showtime.room.numberOfColumns}
                                numberOfRows={showtime.room.numberOfRows}
                    />

                    <div className="seats-info">
                        {seatsInfo.map((info, index) => (
                            <div className="info" key={index}>
                                <div className="color" style={{backgroundColor: info[1]}}></div>
                                <p>{info[0]}</p>
                            </div>
                        ))}
                    </div>
                    <BookingInfo price={price} selectedSeats={selectedSeats} handlePurchase={handlePurchase} film={film}
                                 showtime={showtime}/>
                </div>
            )}
            <div className="schedule-film">
                <img src={film.poster} alt="film poster"/>
                <div className="film-info">
                    <p className="film-age">{film.ageRestricted}+</p>
                    <p className="film-name">{film.name}</p>
                    <p className="film-genre">
                        {film.genres.map(genre => genre.name).join(", ")}
                    </p>
                    <div className="film-schedule">
                        {showtimes.map((showtime, index) => {
                            const isValid = checkShowtimeValid(showtime.showDate, showtime.startTime);
                            return (
                                <div
                                    key={index}
                                    className={`showtime ${isValid ? '' : 'outdated'}`}
                                    onClick={isValid ? () => handleSelectedShowtime(showtime) : null}
                                >
                                    <p>{showtime.startTime} ~ {showtime.endTime}</p>
                                    <p>Price: {formatCurrency(showtime.basePrice)}</p>
                                </div>
                            );
                        })}
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
        ageRestricted: PropTypes.number.isRequired,
        genres: PropTypes.arrayOf(object).isRequired
    }).isRequired,
    showtimes: PropTypes.arrayOf(PropTypes.shape({
        startTime: PropTypes.string.isRequired, // String in HH:mm:ss format
        endTime: PropTypes.string.isRequired,   // String in HH:mm:ss format
        basePrice: PropTypes.number.isRequired, // Price in number format
    })).isRequired
};

export default FilmCard;
