import "./Schedule.css";

import CinemaLogo from "../../../common/CinemaLogo/CinemaLogo.jsx";
import FilmCard from "../FilmCard/FilmCard.jsx";
import SeparateLine from "../../../common/SeparateLine/SeparateLine.jsx";
import Button from "../../../common/Button/Button.jsx";

import Price from "../../../../assets/Icons/priceTag.svg";
import Location from "../../../../assets/Icons/location.svg";
import ArrowUp from "../../../../assets/Icons/arrow-upward.svg";
import { WebContext } from "../../../../utils/webContext.jsx";
import {useContext, useEffect, useState} from "react";
import ScheduleDate from "../../../common/Date/Date.jsx";

// Helper function to format the date into "MMM dd, yyyy"
const formatDate = (dateObj) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
};

// Helper function to convert date into ['Day in week', dd]
const getDisplayDate = (dateObj) => {
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
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

    return { minPrice, maxPrice };
};

function Schedule() {
    const { cinemaList, showtimeList, filmList } = useContext(WebContext);

    // Initialize the dates (actual dates stored as "MMM dd, yyyy")
    const dates = [
        new Date("2024-10-04"),
        new Date("2024-10-05"),
        new Date("2024-10-06"),
        new Date("2024-10-07"),
        new Date("2024-10-08"),
        new Date("2024-10-09"),
        new Date("2024-10-10")
    ];

    // Set CGV as the default selected cinema
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formatDate(dates[0])); // Track selected date (default to the first date in "MMM dd, yyyy" format)
    useEffect(() => {
        if (cinemaList && cinemaList.length > 0) {
            const defaultCinema = cinemaList.find(cinema => cinema.name === 'CGV');
            setSelectedCinema(defaultCinema);
        }
    }, [cinemaList]);
    // Function to filter films based on selected cinema and date
    const filterFilmsByCinemaAndDate = (cinemaId, date) => {
        const filmShowtimeMap = {};

        showtimeList.forEach(showtime => {
            if ((!cinemaId || showtime.room.cinema.cinemaId === cinemaId) && showtime.showDate === date) {
                const filmId = showtime.movie.movieId;
                if (!filmShowtimeMap[filmId]) {
                    filmShowtimeMap[filmId] = [];
                }
                filmShowtimeMap[filmId].push(showtime);
            }
        });

        return filmList.filter(film => filmShowtimeMap[film.movieId])
            .map(film => ({
                ...film,
                showtimes: filmShowtimeMap[film.movieId]
            }));
    };

    // Function to handle cinema logo click (no longer needed since CGV is default)
    const handleCinemaClick = (cinema) => {
        setSelectedCinema(cinema); // Set selected cinema
    };

    // Function to handle date click
    const handleDateClick = (date) => {
        setSelectedDate(formatDate(date)); // Store the actual date in "MMM dd, yyyy"
    };

    return (
        <div className="schedule-section">
            <SeparateLine />
            <h1>Select Films on Schedule</h1>

            {/* Cinema Selection */}
            {/* Remove "All" option and directly start with selected CGV */}
            <div className="cinema-list">
                {cinemaList.map((cinema, index) => (
                        <CinemaLogo
                            key={index}
                            logo={cinema.logo}
                            name={cinema.name}
                            onClick={() => handleCinemaClick(cinema)}
                        />
                ))}
            </div>

            <div className="line"></div>
            <table>
                <thead>
                <tr>
                    <th>
                        <div className="buttons-cont">
                            <Button><img src={Price} alt={"price"} /> Price <img src={ArrowUp} alt={"arrow-up"} /></Button>
                            <Button>Near You <img src={Location} alt={"near-you"} /></Button>
                        </div>
                    </th>
                    <th>
                        {selectedCinema && (
                            <div className="cinematic-info">
                                <h2>Schedule of {selectedCinema.name}</h2>
                                <p>{selectedCinema.address}</p>
                            </div>
                        )}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div className="cinema-list-box">
                            {cinemaList.map((cinema, index) => {
                                const priceRange = getPriceRangeForCinema(cinema.cinemaId, showtimeList); // Calculate price range
                                return (
                                    <div className="cinema" key={index}>
                                        <p className="name">{cinema.name}</p>
                                        {priceRange ? (
                                            <p className="price-range">
                                                {priceRange.minPrice === priceRange.maxPrice
                                                    ? `Price: ${priceRange.minPrice}đ`  // If min equals max, display single price
                                                    : `Price range: ${priceRange.minPrice}đ - ${priceRange.maxPrice}đ`}  {/* Else display price range */}
                                            </p>
                                        ) : (
                                            <p className="price-range">No showtimes available</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </td>
                    <td>
                        <div className="films-list-container">
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
                            <div className="films-list">
                                {filterFilmsByCinemaAndDate(selectedCinema?.cinemaId, selectedDate).map((film, index) => (
                                    <FilmCard
                                        key={index}
                                        film={film}
                                        showtimes={film.showtimes}
                                    />
                                ))}
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;
