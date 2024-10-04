import "./FilmLists.css";
import FilmCard from "../../../common/FilmCard/FilmCard.jsx";
import poster1 from "../../../../assets/posters/Joker2.jpg";
import poster2 from "../../../../assets/posters/SlowHorses.jpg";
import poster3 from "../../../../assets/posters/DunePartTwo.jpg";
import poster4 from "../../../../assets/posters/Napoleon.jpg";
import poster5 from "../../../../assets/posters/Alien.jpg";
import poster6 from "../../../../assets/posters/TransformerOne.jpg";
import poster7 from "../../../../assets/posters/Crow.jpg";
import poster8 from "../../../../assets/posters/Batman.jpg";
import ForwardBtn from "../../../common/ForwardBtn/ForwardBtn.jsx";
import BackWardBtn from "../../../common/BackWardBtn/BackWardBtn.jsx";
import {useState} from "react";

function FilmLists() {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    return (
        <div className="film-lists">
            <div className="now-playing-films">
                <h2>Now Playing</h2>
                <div className="film-list" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <BackWardBtn className={isHover ? "" : "hidden"} />
                    <ForwardBtn className={isHover ? "" : "hidden"} />
                    <FilmCard poster={poster1} name={"Joker: Folie à Deux"} number={"1"} genre={"Thriller, Comedy"} />
                    <FilmCard poster={poster2} name={"Slow Horses"} number={"2"} genre={"Thriller"} />
                    <FilmCard poster={poster3} name={"Dune Part Two"} number={"3"} genre={"Thriller"} />
                    <FilmCard poster={poster4} name={"Napoleon"} number={"4"} genre={"Drama"} />
                </div>
            </div>

            <div className="separate-line"></div>

            <div className="upcoming-films">
                <h2>Upcoming</h2>
                <div className="film-list" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <BackWardBtn className={isHover ? "" : "hidden"} />
                    <ForwardBtn className={isHover ? "" : "hidden"} />
                    <FilmCard poster={poster5} name={"Alien Romulus"} number={1} genre={"Horror"} />
                    <FilmCard poster={poster6} name={"Transformer One"} number={2} genre={"Animation . Action"} />
                    <FilmCard poster={poster7} name={"The Crow"} number={3} genre={"Thriller"} />
                    <FilmCard poster={poster8} name={"Batman"} number={4} genre={"Action"} />
                </div>
            </div>
        </div>
    );
}

export default FilmLists;