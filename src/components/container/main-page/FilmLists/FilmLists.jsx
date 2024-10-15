import "./FilmLists.css";
import PropTypes from "prop-types";
import Slider from "../../../common/Slider/Slider.jsx";

function FilmLists({ filmLists }) {
    const playingFilms = [];
    const upcomingFilms = [];

    filmLists.forEach((film) => {
        if (film.status === "Playing") {
            playingFilms.push(film);
        } else if (film.status === "Upcoming") {
            upcomingFilms.push(film);
        }
    });

    console.log("Playing Films:", playingFilms);
    console.log("Upcoming Films:", upcomingFilms);

    console.log(playingFilms)
    return (
        <div className="film-lists">
            <div className="now-playing-films">
                <h2>Now Playing</h2>
                <Slider filmLists={playingFilms} />
            </div>

            <span className="separate-line"></span>

            <div className="upcoming-films">
                <h2>Upcoming</h2>
                <Slider filmLists={upcomingFilms} />
            </div>
        </div>
    );
}

FilmLists.propTypes = {
    filmLists: PropTypes.array.isRequired,
};

FilmLists.defaultProps = {
    filmLists: [],
};

export default FilmLists;