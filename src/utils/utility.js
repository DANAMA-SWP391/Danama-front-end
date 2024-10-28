import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler); // Clean up timeout if value or delay changes
    }, [value, delay]);

    return debouncedValue;
}
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount) + 'VND';
}
export const getNext7Days = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        dates.push(nextDate);
    }

    return dates;
};
export const formatDate = (dateObj) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
};

export const getPriceRangeForCinema = (cinemaId, showtimeList) => {
    const cinemaShowtimes = showtimeList.filter(showtime => showtime.room.cinema.cinemaId === cinemaId);
    if (cinemaShowtimes.length === 0) {
        return null; // No showtimes, no price range
    }

    const prices = cinemaShowtimes.map(showtime => showtime.basePrice); // Collect prices
    const minPrice = Math.min(...prices); // Minimum price
    const maxPrice = Math.max(...prices); // Maximum price

    return {minPrice, maxPrice};
};

export const getDisplayDate = (dateObj) => {
    const dayOfWeek = dateObj.toLocaleDateString('en-US', {weekday: 'short'});
    const day = dateObj.getDate();
    return [dayOfWeek, day];
};
export const checkShowtimeValid = (showDate, startTime) => {
    // Month mapping for converting month abbreviations to numbers
    const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    // Parse `showDate` string into components
    const [monthStr, day, year] = showDate.split(' ');
    const month = months[monthStr];

    // Parse `startTime` string into hours and minutes
    const [hours, minutes] = startTime.split(':').map(Number);

    if (month === undefined || !day || !year || hours === undefined || minutes === undefined) {
        console.error('Invalid date or time format:', showDate, startTime);
        return false;
    }

    // Construct the local datetime of the show
    const showDateTime = new Date(
        parseInt(year),
        month,
        parseInt(day),
        hours,
        minutes
    );

    // Get current local time
    const now = new Date();

    // Check if showtime is at least 30 minutes in the future
    return (showDateTime - now) > 30 * 60 * 1000; // 30 minutes in milliseconds
};


