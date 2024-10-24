import "./Body.css";
import PropTypes from 'prop-types';

import MainSlide from "../MainSlide/MainSlide.jsx";
import FilmLists from "../FilmLists/FilmLists.jsx";
import Schedule from "../Schedule/Schedule.jsx";

function Body({ isLogged, filmLists }) {

    return (
        <div className="body">
            <MainSlide isLogged={isLogged} filmLists={filmLists}  />
            <FilmLists filmLists={filmLists} />
            <Schedule />
        </div>
    );
}

Body.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    filmLists: PropTypes.array.isRequired
};

export default Body;