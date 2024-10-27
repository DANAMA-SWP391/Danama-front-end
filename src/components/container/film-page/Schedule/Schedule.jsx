import "./Schedule.css";

import Price from "../../../../assets/Icons/priceTag.svg";
import Location from "../../../../assets/Icons/location.svg";
import ArrowUpward from "../../../../assets/Icons/arrow-upward.svg";
import ArrowDownward from "../../../../assets/Icons/arrow_downward.svg";
import PropTypes from "prop-types";
import Button from "../../../common/Button/Button.jsx";
import ScheduleDate from "../../../common/Date/Date.jsx";
import {WebContext} from "../../../../utils/webContext.jsx";
import {useContext, useEffect, useState} from "react";
import ShowtimeCard from "../ShowtimeCard/ShowtimeCard.jsx";
import {
    formatCurrency,
    formatDate,
    getDisplayDate,
    getNext7Days,
    getPriceRangeForCinema
} from "../../../../utils/utility.js";

function Schedule({showtimes, film}) {
    const {cinemaList} = useContext(WebContext);

    const dates = getNext7Days();

    const [selectedCinema, setSelectedCinema] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formatDate(dates[0]));
    const [sortByPrice, setSortByPrice] = useState(false); // State to track sorting by price
    const [sortOrder, setSortOrder] = useState('desc'); // Track ascending or descending sort order

    useEffect(() => {
        if (cinemaList && cinemaList.length > 0) {
            const defaultCinema = cinemaList.find(cinema => cinema.name === 'CGV');
            setSelectedCinema(defaultCinema);
        }
    }, [cinemaList]);
    // Handle the directions button click
    const handleDirectionOnClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;

                    // Generate the Google Maps directions URL
                    if (selectedCinema) {
                        const destination = encodeURIComponent(selectedCinema.address);
                        const origin = `${latitude},${longitude}`;
                        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
                        window.open(url, '_blank'); // Open the URL in a new tab
                    } else {
                        alert("Select a cinema!!");
                    }
                },
                (error) => {
                    console.error("Error fetching location", error);
                    alert("Unable to retrieve your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Function to handle cinema logo click (set selected cinema)
    const handleCinemaClick = (cinema) => {
        setSelectedCinema(cinema); // Set selected cinema
    };

    // Function to handle date click
    const handleDateClick = (date) => {
        setSelectedDate(formatDate(date)); // Store the actual date in "MMM dd, yyyy"
    };

    // Function to sort cinemas by price range based on sort order
    const sortCinemasByPrice = (cinemas) => {
        return cinemas.sort((a, b) => {
            const priceA = getPriceRangeForCinema(a.cinemaId, showtimes);
            const priceB = getPriceRangeForCinema(b.cinemaId, showtimes);

            const maxPriceA = priceA ? priceA.maxPrice : 0;
            const maxPriceB = priceB ? priceB.maxPrice : 0;

            return sortOrder === 'asc' ? maxPriceB - maxPriceA : maxPriceA - maxPriceB; // Ascending or descending
        });
    };

    // Handle the sorting toggle and update the sort order
    const handleSortByPrice = () => {
        setSortByPrice(true);
        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc'); // Toggle sort order
    };

    return (
        <div className="film-schedules">
            <h1>Schedules for {film?.name || "Selected Movie"}</h1>

            {/* Date Selection */}
            <div className="dates">
                {dates.map((date, index) => {
                    const displayDate = getDisplayDate(date); // Get the ['Day in week', dd] format
                    return (
                        <ScheduleDate
                            key={index}
                            date={displayDate}
                            onClick={() => handleDateClick(date)} // Handle date click
                            selected={selectedDate === formatDate(date)}
                        />
                    );
                })}
            </div>

            <div className="schedule-container">
                <div className="cinema-list">
                    {(sortByPrice ? sortCinemasByPrice([...cinemaList]) : cinemaList).map((cinema, index) => {
                        const priceRange = getPriceRangeForCinema(cinema.cinemaId, showtimes);

                        return (
                            <div key={index}
                                 className={`cinema-logo ${selectedCinema?.cinemaId === cinema.cinemaId ? 'selected-cinema' : ''}`}
                                 onClick={() => handleCinemaClick(cinema)}>
                                <div>
                                    <img src={cinema.logo} alt={cinema.name}/>
                                    <p>{cinema.name}</p>
                                </div>
                                {priceRange ? (
                                    <p className="price-range">
                                        {priceRange.minPrice === priceRange.maxPrice
                                            ? `Price: ${formatCurrency(priceRange.minPrice)}`
                                            : `Price range: ${formatCurrency(priceRange.minPrice)} - ${formatCurrency(priceRange.maxPrice)}`}
                                    </p>
                                ) : (
                                    <p className="price-range">No showtimes available</p>
                                )}
                            </div>

                        );
                    })}
                </div>

                <div className="schedules">
                    <div className="button-cont">
                        <Button onClick={handleSortByPrice}>
                            <img src={Price} alt="price"/> Price
                            <img
                                src={sortOrder === 'desc' ? ArrowUpward : ArrowDownward}
                                alt={sortOrder === 'desc' ? "arrow-up" : "arrow-down"}
                            />
                        </Button>
                        <Button onClick={handleDirectionOnClick}>
                            <img src={Location} alt="directions"/> Get Directions
                        </Button>
                    </div>

                    <div className="schedule">
                        <h2>{selectedCinema?.name}</h2>
                        <p className="address">{selectedCinema?.address}</p>
                        {showtimes
                            .filter(showtime => showtime.room.cinema.cinemaId === selectedCinema?.cinemaId && showtime.showDate === selectedDate)
                            .map((showtime, index) => (
                                <div className="showtimes" key={index}>
                                    <ShowtimeCard showtime={showtime} film={film}/>
                                </div>
                            ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

Schedule.propTypes = {
    showtimes: PropTypes.arrayOf(PropTypes.shape({
        movie: PropTypes.shape({
            movieId: PropTypes.string.isRequired,
        }).isRequired,
        room: PropTypes.shape({
            roomId: PropTypes.number.isRequired,
            cinema: PropTypes.shape({
                cinemaId: PropTypes.string.isRequired,
            }).isRequired
        }).isRequired,
        showDate: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        basePrice: PropTypes.number.isRequired
    })).isRequired,
    film: PropTypes.shape({
        movieId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};

export default Schedule;