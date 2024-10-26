import {openDB} from "idb";

export const fetchDetailMovie = async(movieId) => {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/detailMovie?movieId=${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        return data; // Contains movie, showtimes, reviews
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};
export const fetchDetailShowtime = async (showtimeId, roomId) => {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/detailShowtime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ showtimeId, roomId })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch showtime details');
        }

        const data = await response.json();
        return data; // Contains showtime, seats, and tickets
    } catch (error) {
        console.error('Error fetching showtime details:', error);
        return null;
    }
};
export const fetchMoviePage = async() => {
    try {
        // Make an API call to the endpoint that handles the movie page retrieval
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/moviePage', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();

        // Return the movie list from the response
        return data.movies;
    } catch (error) {
        // Handle any errors
        console.error('Failed to fetch movie page:', error);
        throw error;
    }
}
export async function fetchShowtimePage() {
    try {
        // Make a GET request to the endpoint that handles the showtime page retrieval
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/showtimePage', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();

        // Return the list of cinemas and showtimes from the response
        return data;
    } catch (error) {
        // Handle any errors
        console.error('Failed to fetch showtime page:', error);
        throw error;
    }
}
export async function fetchHomePage() {
    try {
        // Make a GET request to the endpoint that handles the homepage retrieval
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();
        const { movies, showtimes, cinemas } = data;

        // Open IndexedDB and update the database
        const db = await openDB('DANAMA_DB', 1, {
            upgrade(db) {
                // Create object stores if they do not exist
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

        // Save or update data in IndexedDB
        await db.put('films', movies, 'filmList');
        await db.put('showtimes', showtimes, 'showtimeList');
        await db.put('cinemas', cinemas, 'cinemaList');
        await db.put('films', new Date().getTime(), 'lastUpdated'); // Update timestamp

        return { movies, showtimes, cinemas }; // Return the data to be used in your app

    } catch (error) {
        // Handle any errors
        console.error('Failed to fetch home page data:', error);
        throw error;
    }
}
export async function upFileToAzure(file) {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8080/DANAMA_war_exploded/uploadFileToAzure", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data.imageUrl; // The URL of the uploaded image
        } else {
            console.error("Failed to upload image:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}
