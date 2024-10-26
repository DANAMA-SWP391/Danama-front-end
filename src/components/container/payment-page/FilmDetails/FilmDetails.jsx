import "./FilmDetails.css";
import PropTypes from "prop-types";

function FilmDetails({ film }) {
    return (
        <div className="film-details">
            <p>Film name: {film.name}</p>
        </div>
    );
}
FilmDetails.propTypes = {
    film: PropTypes.shape({
        name: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        ageRestricted: PropTypes.number.isRequired,
    }).isRequired,
};
export default FilmDetails;
