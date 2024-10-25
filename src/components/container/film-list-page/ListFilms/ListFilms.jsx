import "./ListsFilm.css";
import FilmCard from "../../../common/FilmCard/FilmCard.jsx";
import PropTypes from "prop-types";

function ListFilms({ filteredFilms }) {
    return (
        <div className="filtered-films">
            {filteredFilms.map((film, index) => (
                <FilmCard key={film.movieId} film={film} index={index} />
            ))}
        </div>
    );
}

ListFilms.propTypes = {
    filteredFilms: PropTypes.arrayOf(
        PropTypes.shape({
            movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string,           // Optional film title
            genres: PropTypes.arrayOf(
                PropTypes.shape({
                    genreId: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired
                })
            ),
            country: PropTypes.string,          // Optional country field
            status: PropTypes.number,           // Optional status field
            // Add more fields as needed
        })
    ).isRequired
};

export default ListFilms;
