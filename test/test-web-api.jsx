import {useState} from "react";
import {
    fetchDetailMovie,
    fetchDetailShowtime,
    fetchHomePage,
    fetchMoviePage,
    fetchShowtimePage
} from "../src/api/webAPI.jsx";


function TestWebApi() {
    // Movie states
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieError, setMovieError] = useState(null);

    // Showtime states
    const [showtimeDetails, setShowtimeDetails] = useState(null);
    const [showtimeError, setShowtimeError] = useState(null);

    // Movie Page states
    const [moviePageData, setMoviePageData] = useState(null);
    const [moviePageError, setMoviePageError] = useState(null);

    // Showtime Page states
    const [showtimePageData, setShowtimePageData] = useState(null);
    const [showtimePageError, setShowtimePageError] = useState(null);

    // Home Page states
    const [homeData, setHomeData] = useState(null);
    const [homeError, setHomeError] = useState(null);

    // Function to test DetailMovie API
    async function handleTestDetailMovieApi() {
        const movieId = 1; // Replace this with a dynamic value if needed
        try {
            const data = await fetchDetailMovie(movieId);
            if (data) {
                setMovieDetails(data);
                setMovieError(null); // Clear any previous movie error
            } else {
                setMovieError('No data received for movie');
            }
        } catch (err) {
            setMovieError('Failed to fetch movie details');
        }
    }

    // Function to test Showtime API
    async function handleTestDetailShowtimeApi() {
        const showtimeId = 1; // Replace this with a dynamic value if needed
        try {
            const data = await fetchDetailShowtime(showtimeId);
            if (data) {
                setShowtimeDetails(data);
                setShowtimeError(null); // Clear any previous showtime error
            } else {
                setShowtimeError('No data received for showtime');
            }
        } catch (err) {
            setShowtimeError('Failed to fetch showtime details');
        }
    }

    // Function to test MoviePage API
    async function handleTestMoviePageApi(){
        try {
            const data = await fetchMoviePage();
            if (data) {
                setMoviePageData(data);
                setMoviePageError(null); // Clear any previous movie page error
            } else {
                setMoviePageError('No data received for movie page');
            }
        } catch (err) {
            setMoviePageError('Failed to fetch movie page');
        }
    }

    // Function to test Showtime Page API
    async function handleTestShowtimePageApi() {
        try {
            const data = await fetchShowtimePage();
            if (data) {
                setShowtimePageData(data);
                setShowtimePageError(null); // Clear any previous error
            } else {
                setShowtimePageError('No data received for showtime page');
            }
        } catch (err) {
            setShowtimePageError('Failed to fetch showtime page');
        }
    }

    async function handleTestHomePageApi() {
        try {
            const data = await fetchHomePage();
            if (data) {
                setHomeData(data);
                setHomeError(null); // Clear any previous error
            } else {
                setHomeError('No data received for home page');
            }
        } catch (err) {
            setHomeError('Failed to fetch home page data');
        }
    }

    return (
        <div>
            {/* Movie API Test Button */}
            <div>
                <button onClick={handleTestDetailMovieApi}>Test Movie API</button>
                {movieError && <p style={{color: 'red'}}>{movieError}</p>}
                {movieDetails && (
                    <div>
                        <h2>Movie Details</h2>
                        <pre>{JSON.stringify(movieDetails, null, 2)}</pre>
                    </div>
                )}
            </div>

            {/* Showtime API Test Button */}
            <div>
                <button onClick={handleTestDetailShowtimeApi}>Test Showtime API</button>
                {showtimeError && <p style={{color: 'red'}}>{showtimeError}</p>}
                {showtimeDetails && (
                    <div>
                        <h2>Showtime Details</h2>
                        <pre>{JSON.stringify(showtimeDetails, null, 2)}</pre>
                    </div>
                )}
            </div>

            {/* Movie Page API Test Button */}
            <div>
                <button onClick={handleTestMoviePageApi}>Test Movie Page API</button>
                {moviePageError && <p style={{color: 'red'}}>{moviePageError}</p>}
                {moviePageData && (
                    <div>
                        <h2>Movie Page Data</h2>
                        <pre>{JSON.stringify(moviePageData, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div>
                <button onClick={handleTestShowtimePageApi}>Test Showtime Page API</button>
                {showtimeError && <p style={{color: 'red'}}>{showtimeError}</p>}
                {showtimePageData && (
                    <div>
                        <h2>Showtime Page Data</h2>
                        <pre>{JSON.stringify(showtimePageData, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div>
                <button onClick={handleTestHomePageApi}>Test Home Page API</button>
                {homeError && <p style={{color: 'red'}}>{homeError}</p>}
                {homeData && (
                    <div>
                        <h2>Home Page Data</h2>
                        <pre>{JSON.stringify(homeData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}


export default TestWebApi;
