import "./Body.css";

import MainSlide from "../MainSlide/MainSlide.jsx";
import FilmLists from "../FilmLists/FilmLists.jsx";

function Body() {
    return (
        <div className="body">
            <MainSlide />
            <FilmLists />
        </div>
    );
}

export default Body;