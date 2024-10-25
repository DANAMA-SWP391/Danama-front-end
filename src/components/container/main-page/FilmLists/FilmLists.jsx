import "./FilmLists.css";
import { useContext } from "react";
import Slider from "../../../common/Slider/Slider.jsx";
import {WebContext} from "../../../../utils/webContext.jsx"; // Import WebContext

function FilmLists() {
    // Use useContext to access filmList from WebContext
    const { filmList } = useContext(WebContext);
    const playingFilms = [];
    const upcomingFilms = [];

    filmList.forEach((film) => {
        if (film.status === 1) {
            playingFilms.push(film);
        } else if (film.status === 2) {
            upcomingFilms.push(film);
        }
    });

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

export default FilmLists;
