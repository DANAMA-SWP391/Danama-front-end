import "./Body.css";
import MainSlide from "../MainSlide/MainSlide.jsx";
import FilmLists from "../FilmLists/FilmLists.jsx";
import Schedule from "../Schedule/Schedule.jsx";
import {useContext} from "react";
import {WebContext} from "../../../../utils/webContext.jsx";
import AboutUs from "../AboutUs/AboutUs.jsx";

function Body() {
    const {filmList} = useContext(WebContext);
    const filmListForSlide = filmList
        .filter(film => film.status === 1)
        .slice(0, 5);

    return (
        <div className="body">
            <MainSlide filmLists={filmListForSlide}  />
            <FilmLists />
            <Schedule />
            <AboutUs />
        </div>
    );
}

export default Body;