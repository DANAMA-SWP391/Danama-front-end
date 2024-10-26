import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { openDB } from 'idb';
import { fetchHomePage } from "../api/webAPI.jsx";

// Create the provider component
export const WebContext = createContext();

export const WebProvider = ({ children }) => {
    const [filmList, setFilmList] = useState([]);
    const [showtimeList, setShowtimeList] = useState([]);
    const [cinemaList, setCinemaList] = useState([]);

    // Function to open the database and ensure object stores exist
    const openDatabase = async () => {
        return openDB('DANAMA_DB', 1, {
            upgrade(db) {
                // Create the object stores if they don't exist
                if (!db.objectStoreNames.contains('films')) {
                    db.createObjectStore('films');
                }
                if (!db.objectStoreNames.contains('showtimes')) {
                    db.createObjectStore('showtimes');
                }
                if (!db.objectStoreNames.contains('cinemas')) {
                    db.createObjectStore('cinemas');
                }
            },
        });
    };

    // Function to load data from IndexedDB
    const loadDataFromIndexedDB = async () => {
        const db = await openDatabase(); // Ensure the database and object stores are open
        const storedFilms = await db.get('films', 'filmList');
        const storedShowtimes = await db.get('showtimes', 'showtimeList');
        const storedCinemas = await db.get('cinemas', 'cinemaList');

        const isDataMissing = !storedFilms || !storedShowtimes || !storedCinemas;

        setFilmList(storedFilms || []); // Set data from IndexedDB
        setShowtimeList(storedShowtimes || []);
        setCinemaList(storedCinemas || []);

        return isDataMissing; // Return whether data is missing
    };

    // Function to call API and update IndexedDB every 1 hour
    const updateDataFromAPI = async () => {
        try {
            await fetchHomePage(); // Fetch data and update IndexedDB
            await loadDataFromIndexedDB(); // Load updated data from IndexedDB
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Main logic to manage data
    useEffect(() => {
        const manageData = async () => {
            // Load data from IndexedDB first
            const isDataMissing = await loadDataFromIndexedDB();

            // If data is missing, call API immediately to update data and IndexedDB
            if (isDataMissing) {
                await updateDataFromAPI();
            }

            // Set interval to call API every 1 hour (3600000 milliseconds)
            const intervalId = setInterval(updateDataFromAPI, 3600000);

            // Clean up interval on unmount
            return () => clearInterval(intervalId);
        };

        manageData();
    }, []);

    return (
        <WebContext.Provider value={{ filmList, showtimeList, cinemaList }}>
            {children}
        </WebContext.Provider>
    );
};

WebProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
