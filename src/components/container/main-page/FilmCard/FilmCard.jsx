import PropTypes from 'prop-types';
import "./FilmCard.css";

function FilmCard({ film, showtimes }) {
    return (
        <div className="schedule-film">
            <img src={film.poster} alt="film poster" />
            <div className="film-info">
                <p className="film-age">{film.ageRestricted}+</p>
                <p className="film-name">{film.name}</p>
                <p className="film-genre">{film.genre}</p>
                <div className="film-schedule">
                    {showtimes.map((showtime, index) => (
                        <div key={index} className="showtime">
                            {/* Display the startTime and endTime exactly as they are without conversion */}
                            <p>{showtime.startTime} ~ {showtime.endTime}</p>
                            <p>Price: {showtime.basePrice}đ</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

FilmCard.propTypes = {
    film: PropTypes.shape({
        poster: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ageRestricted: PropTypes.number.isRequired, // Ensure it's a number as you mentioned
        genre: PropTypes.string.isRequired,
    }).isRequired,
    showtimes: PropTypes.arrayOf(PropTypes.shape({
        startTime: PropTypes.string.isRequired, // String in HH:mm:ss format
        endTime: PropTypes.string.isRequired,   // String in HH:mm:ss format
        basePrice: PropTypes.number.isRequired, // Price in number format
    })).isRequired
};

export default FilmCard;
