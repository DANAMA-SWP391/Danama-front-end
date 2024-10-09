import "./Body.css";

import MainSlide from "../MainSlide/MainSlide.jsx";
import FilmLists from "../FilmLists/FilmLists.jsx";
import Schedule from "../Schedule/Schedule.jsx";

function Body() {
    return (
        <div className="body">
            <MainSlide />
            <FilmLists />
            <Schedule />
        </div>
    );
}

export default Body;