import "./FilmCard.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function FilmCard({ film, index }) {
    return (
        <Link to={{ pathname: "/film-page", state: { film } }} className={"film-card"}>
            <div className="poster">
                <img src={film.poster} alt={film.name} />
            </div>
            <div className="info">
                <h2>{index + 1}</h2>
                <div className="other-infos">
                    <div className="name">{film.name}</div>
                    <div className="genre">{film.genre}</div>
                </div>
            </div>
        </Link>
    );
}

FilmCard.propTypes = {
    film: PropTypes.shape({
        poster: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default FilmCard;