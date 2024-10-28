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