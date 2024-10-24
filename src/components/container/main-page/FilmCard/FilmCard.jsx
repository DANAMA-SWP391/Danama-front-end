import PropTypes from 'prop-types';
import "./FilmCard.css";
import SeatLayout from "../SeatLayout/SeatLayout.jsx";
import BookingInfo from "../BookingInfo/BookingInfo.jsx";
import BackSpace from '../../../../assets/Icons/back-space.svg';
import {useState} from "react";
import {fetchDetailShowtime} from "../../../../api/webAPI.jsx";

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
    const handleSelectedShowtime = async (showtime) => {
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
    console.log(seats);
    const handleClick =() => {
        setIsClick(!isClick);
        setSeats([]);
        setSelectedSeats([]);
        setPrice(0);
    }
    const handleSelectSeat = (seat) => {
        if (selectedSeats.includes(seat.seatNum)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat.seatNum)); // Remove seat
            setPrice(price - seat.price); // Decrease price by seat price
        } else {
            setSelectedSeats([...selectedSeats, seat.seatNum]); // Add seat
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
    const handlePurchase = () => {

    }
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
