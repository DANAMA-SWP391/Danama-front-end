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
export const fetchDetailShowtime = async (showtimeId) => {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/detailShowtime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ showtimeId })
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

        // Return the homepage data
        return data;
    } catch (error) {
        // Handle any errors
        console.error('Failed to fetch home page data:', error);
        throw error;
    }
}