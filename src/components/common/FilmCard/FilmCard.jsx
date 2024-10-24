import "./FilmCard.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function FilmCard({ film, index }) {
    return (
        <Link to="/film-page" state={{ film }} className={"film-card"}>
            <div className="poster">
                <img src={film.poster} alt={film.name} />
            </div>
            <div className="info">
                <h2>{index + 1}</h2>
                <div className="other-infos">
                    <div className="name">{film.name}</div>
                    {/* Display genre names by joining the array */}
                    <div className="genre">
                        {film.genres.map(genre => genre.name).join(", ")}
                    </div>
                </div>
            </div>
        </Link>
    );
}

FilmCard.propTypes = {
    film: PropTypes.shape({
        poster: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        // Ensure that the genres array contains objects with a 'name' string
        genres: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default FilmCard;
