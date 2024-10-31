import "./ShowtimeCard.css"
import PropTypes from "prop-types";
import {fetchDetailShowtime} from "../../../../api/webAPI.jsx";
import {fetchJwtToken} from "../../../../api/authAPI.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {addBooking} from "../../../../api/userAPI.js";
import BackSpace from '../../../../assets/Icons/back-space.svg';
import SeatLayout from "../../main-page/SeatLayout/SeatLayout.jsx";
import BookingInfo from "../../main-page/BookingInfo/BookingInfo.jsx";
import {checkShowtimeValid, formatCurrency} from "../../../../utils/utility.js";
import {useCustomAlert} from "../../../../utils/CustomAlertContext.jsx";


function ShowtimeCard({film, showtime, isValid}) {
    const showAlert = useCustomAlert();
    const [isClick, setIsClick] = useState(false);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [user, setUser] = useState(null); // Store user data here
    const navigate = useNavigate();
    const seatsInfo = [
        ["Booked", "black"], ["Selected", "#BCB3B3"], ["Standard", "#1BA0D4"], ["VIP", "#D64242"], ['Couple','#FFD700']
    ];
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
    // Function to handle the selection of a showtime
    const handleSelectedShowtime = async () => {
        setIsClick(true);
        setLoading(true);

        // Check if user exists or needs to be fetched
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


    // Handle the seat selection logic
    const handleSelectSeat = (seat) => {
        const isAlreadySelected = selectedSeats.some(selectedSeat => selectedSeat.seatNum === seat.seatNum);

        if (isAlreadySelected) {
            setSelectedSeats(selectedSeats.filter(s => s.seatNum !== seat.seatNum));
            setPrice(price - seat.price);
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            setPrice(price + seat.price);
        }
    };

    const handlePurchase = async () => {
        if(selectedSeats.length === 0) {
            showAlert("Please choose a seat before purchase!!");
            return;
        }
        if(!checkShowtimeValid(showtime)) {
            showAlert("This showtime can't book ticket anymore");
            setIsClick(false);
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
                window.scroll(0,0);
            } else {
                showAlert('Booking failed');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error during booking creation:', error);
            setLoading(false);
        }
    };
    return (
        <div className={`wrapper ${isClick ? 'darken' : ''}`}>
            {isClick && <div className="overlay"></div>}
            <div
                className={`showtime ${isValid ? '' : 'outdated'}`}
                onClick={isValid ? () => handleSelectedShowtime(showtime) : null}
            >
                <p>{showtime.startTime} ~ {showtime.endTime}</p>
                <p>Price: {formatCurrency(showtime.basePrice)}</p>
            </div>

            {isClick && (
                <div className="book-ticket-container">
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                        </div>
                    )}
                    <img src={BackSpace} alt="back-space" onClick={() => setIsClick(false)}/>
                    <h2>Book Ticket</h2>

                    <SeatLayout
                        selectedSeats={selectedSeats}
                        handleClick={handleSelectSeat}
                        seats={seats}
                        basePrice={showtime.basePrice}
                        getSeatColor={getSeatColor}
                        numberOfRows={showtime.room.numberOfRows}
                        numberOfColumns={showtime.room.numberOfColumns}
                    />
                    <div className="seats-info">
                        {seatsInfo.map((info, index) => (
                            <div className="info" key={index}>
                                <div className="color" style={{backgroundColor: info[1]}}></div>
                                <p>{info[0]}</p>
                            </div>
                        ))}
                    </div>
                    <BookingInfo
                        price={price}
                        selectedSeats={selectedSeats}
                        handlePurchase={handlePurchase}
                        film={film}
                        showtime={showtime}
                    />
                </div>
            )}
        </div>
    );
}

ShowtimeCard.propTypes = {
    film: PropTypes.object.isRequired,
    showtime: PropTypes.object.isRequired,
    isValid: PropTypes.bool.isRequired,
}
export default ShowtimeCard;