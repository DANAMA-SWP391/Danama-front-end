import "./Schedule.css";

import Price from "../../../../assets/Icons/priceTag.svg";
import Location from "../../../../assets/Icons/location.svg";
import ArrowUpward from "../../../../assets/Icons/arrow-upward.svg";
import PropTypes from "prop-types";
import Button from "../../../common/Button/Button.jsx";
import ScheduleDate from "../../../common/Date/Date.jsx";
import {WebContext} from "../../../../utils/webContext.jsx";
import {useContext, useEffect, useState} from "react";
import ShowtimeCard from "../ShowtimeCard/ShowtimeCard.jsx";

// Helper function to format the date into "MMM dd, yyyy"
const formatDate = (dateObj) => {
    const options = {month: 'short', day: 'numeric', year: 'numeric'};
    return dateObj.toLocaleDateString('en-US', options);
};

// Helper function to convert date into ['Day in week', dd]
const getDisplayDate = (dateObj) => {
    const dayOfWeek = dateObj.toLocaleDateString('en-US', {weekday: 'short'});
    const day = dateObj.getDate();
    return [dayOfWeek, day];
};

// Helper function to calculate price range for a cinema's showtimes
const getPriceRangeForCinema = (cinemaId, showtimeList) => {
    const cinemaShowtimes = showtimeList.filter(showtime => showtime.room.cinema.cinemaId === cinemaId);
    if (cinemaShowtimes.length === 0) {
        return null; // No showtimes, no price range
    }

    const prices = cinemaShowtimes.map(showtime => showtime.basePrice); // Collect prices
    const minPrice = Math.min(...prices); // Minimum price
    const maxPrice = Math.max(...prices); // Maximum price

    return {minPrice, maxPrice};
};

function Schedule({showtimes, film}) {
    const {cinemaList} = useContext(WebContext);
    const dates = [
        new Date("2024-10-04"),
        new Date("2024-10-05"),
        new Date("2024-10-06"),
        new Date("2024-10-07"),
        new Date("2024-10-08"),
        new Date("2024-10-09"),
        new Date("2024-10-10")
    ];
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formatDate(dates[0]));
    useEffect(() => {
        if (cinemaList && cinemaList.length > 0) {
            const defaultCinema = cinemaList.find(cinema => cinema.name === 'CGV');
            setSelectedCinema(defaultCinema);
        }
    }, [cinemaList]);

    // Function to handle cinema logo click (set selected cinema)
    const handleCinemaClick = (cinema) => {
        setSelectedCinema(cinema); // Set selected cinema
    };

    // Function to handle date click
    const handleDateClick = (date) => {
        setSelectedDate(formatDate(date)); // Store the actual date in "MMM dd, yyyy"
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
                    {cinemaList.map((cinema, index) => {
                        const priceRange = getPriceRangeForCinema(cinema.cinemaId, showtimes);

                        return (
                            <div key={index} className="cinema-logo" onClick={() => handleCinemaClick(cinema)}>
                                <div>
                                    <img src={cinema.logo} alt={cinema.name}/>
                                    <p>{cinema.name}</p>
                                </div>
                                {priceRange ? (
                                    <p className="price-range">
                                        {priceRange.minPrice === priceRange.maxPrice
                                            ? `Price: ${priceRange.minPrice}đ`  // If min equals max, display single price
                                            : `Price range: ${priceRange.minPrice}đ - ${priceRange.maxPrice}đ`} {/* Else display price range */}
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
                        <Button><img src={Price} alt="price"/> Price <img src={ArrowUpward} alt="arrow-up"/></Button>
                        <Button><img src={Location} alt="near-you"/> Near You </Button>
                    </div>
                    {showtimes
                        .filter(showtime => showtime.room.cinema.cinemaId === selectedCinema?.cinemaId && showtime.showDate === selectedDate)
                        .map((showtime, index) => (
                            <div className="schedule" key={index}>
                                <h2>{selectedCinema?.name}</h2>
                                <p className="address">{selectedCinema?.address}</p>
                                <div className="showtimes">
                                    <ShowtimeCard showtime={showtime} film={film}/>
                                </div>
                            </div>
                        ))}
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