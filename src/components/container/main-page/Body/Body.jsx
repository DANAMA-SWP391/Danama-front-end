import "./Body.css";
import MainSlide from "../MainSlide/MainSlide.jsx";
import FilmLists from "../FilmLists/FilmLists.jsx";
import Schedule from "../Schedule/Schedule.jsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../../utils/userContext.jsx";
import {WebContext} from "../../../../utils/webContext.jsx";
import AboutUs from "../AboutUs/AboutUs.jsx";

function Body() {
    const {user} = useContext(UserContext);
    const {filmList} = useContext(WebContext);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        setIsLogged(!!user);
    }, [user]);

    return (
        <div className="body">
            <MainSlide isLogged={isLogged} filmLists={filmList}  />
            <FilmLists />
            <Schedule />
            <AboutUs />
        </div>
    );
}

export default Body;