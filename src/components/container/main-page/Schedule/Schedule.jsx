import "./Schedule.css";

import CinemaLogo from "../../../common/CinemaLogo/CinemaLogo.jsx";
import FilmCard from "../FilmCard/FilmCard.jsx";
import SeparateLine from "../../../common/SeparateLine/SeparateLine.jsx";
import Button from "../../../common/Button/Button.jsx";
import Address from "../../../../assets/Icons/address.svg";
import Price from "../../../../assets/Icons/priceTag.svg";
import Location from "../../../../assets/Icons/location.svg";
import {WebContext} from "../../../../utils/webContext.jsx";
import {useContext, useEffect, useState} from "react";
import ScheduleDate from "../../../common/Date/Date.jsx";
import ArrowUpward from "../../../../assets/Icons/arrow-upward.svg";
import ArrowDownward from "../../../../assets/Icons/arrow_downward.svg";
import CinemaListBox from "../CinemaListBox/CinemaListBox.jsx";
import {useCustomAlert} from "../../../../utils/CustomAlertContext.jsx";
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
const getNext7Days = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        dates.push(nextDate);
    }

    return dates;
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


function Schedule() {
    const showAlert= useCustomAlert();
    const {cinemaList, showtimeList, filmList} = useContext(WebContext);
    // Initialize the dates (actual dates stored as "MMM dd, yyyy")
    const dates = getNext7Days();
    const [isVisible, setIsVisible] = useState(false);
    const [sortByPrice, setSortByPrice] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formatDate(dates[0])); // Track selected date (default to the first date in "MMM dd, yyyy" format)
    useEffect(() => {
        if (cinemaList && cinemaList.length > 0) {
            const defaultCinema = cinemaList.find(cinema => cinema.name === 'CGV');
            setSelectedCinema(defaultCinema);
        }
    }, [cinemaList]);
    // Function to sort cinemas by price range based on sort order
    const sortCinemasByPrice = (cinemas) => {
        return cinemas.sort((a, b) => {
            const priceA = getPriceRangeForCinema(a.cinemaId, showtimeList);
            const priceB = getPriceRangeForCinema(b.cinemaId, showtimeList);

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
    const handleDirectionOnClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Generate the Google Maps directions URL
                    if (selectedCinema) {
                        const destination = encodeURIComponent(selectedCinema.name);
                        const origin = `${latitude},${longitude}`;
                        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
                        window.open(url, '_blank'); // Open the URL in a new tab
                    }
                    else {
                        showAlert("Select a cinema!!");
                    }
                },
                (error) => {
                    console.error("Error fetching location", error);
                    showAlert("Unable to retrieve your location.");
                }
            );
        } else {
            showAlert("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        const scheduleSection = document.querySelector('.schedule-section');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target); // Stop observing after visibility change
                    }
                });
            },
            {
                threshold: 0.25
            }
        );

        if (scheduleSection) {
            observer.observe(scheduleSection);
        }

        return () => {
            if (scheduleSection) {
                observer.unobserve(scheduleSection);
            }
        };
    }, []);



    return (
        <div className={`schedule-section ${isVisible ? 'visible' : ''}`}>
            <SeparateLine />
            <h1>Select Films on Schedule</h1>
            <>
                {/* Cinema Logos (this part will not be sorted) */}
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
                                <Button onClick={handleSortByPrice}>
                                    <img src={Price} alt="price" /> Price
                                    <img
                                        src={sortOrder === 'desc' ? ArrowUpward : ArrowDownward}
                                        alt={sortOrder === 'desc' ? "arrow-up" : "arrow-down"}
                                    />
                                </Button>
                                <Button onClick={handleDirectionOnClick}>
                                    <img src={Location} alt="directions" /> Get Directions
                                </Button>
                            </div>
                        </th>
                        <th>
                            {selectedCinema && (
                                <div className="cinematic-info">
                                    <h2>Schedule of {selectedCinema.name}</h2>
                                    <div className="address-row">
                                        <p>{selectedCinema.address}</p>
                                        <a
                                            className="map-link"
                                            href={`https://www.google.com/maps?q=${encodeURIComponent(selectedCinema.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img src={Address} alt="Map icon" /> Map
                                        </a>
                                    </div>
                                </div>
                            )}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            {/* Use the CinemaList component here with sorted cinemas */}
                            <CinemaListBox
                                cinemas={sortByPrice ? sortCinemasByPrice([...cinemaList]) : cinemaList} // Clone cinemaList for sorting
                                selectedCinema={selectedCinema}
                                showtimeList={showtimeList}
                                handleCinemaClick={handleCinemaClick}
                                getPriceRangeForCinema={getPriceRangeForCinema}
                            />
                        </td>
                        <td>
                            <div className="films-list-container">
                                <div className="dates">
                                    {dates.map((date, index) => {
                                        const displayDate = getDisplayDate(date);
                                        return (
                                            <ScheduleDate
                                                key={index}
                                                date={displayDate}
                                                onClick={() => handleDateClick(date)}
                                                selected={selectedDate === formatDate(date)}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="films-list">
                                    {filterFilmsByCinemaAndDate(selectedCinema?.cinemaId, selectedDate).map((film, index) => (
                                        <>
                                            <FilmCard key={index} film={film} showtimes={film.showtimes} />
                                            <SeparateLine />
                                        </>
                                    ))}
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </>

        </div>
    );
}

export default Schedule;
