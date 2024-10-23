import "./Body.css";
import MainSlide from "../MainSlide/MainSlide.jsx";
import FilmLists from "../FilmLists/FilmLists.jsx";
import Schedule from "../Schedule/Schedule.jsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../../utils/userContext.jsx";

function Body() {
    const {user} = useContext(UserContext);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        setIsLogged(!!user);
    }, [user]);
    return (
        <div className="body">
            <MainSlide isLogged={isLogged} />
            <FilmLists />
            <Schedule />
        </div>
    );
}

export default Body;