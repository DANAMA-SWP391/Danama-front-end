import { useState, useEffect } from 'react';
import "./MainSlide.css";
import Trailer from "../../../common/Trailer/Trailer.jsx";
import FilmPoster from "../../../common/FilmPoster/FilmPoster.jsx";
import Button from "../../../common/Button/Button.jsx";
import PropTypes, {object} from "prop-types";

function MainSlide({filmLists = [] }) {
    const [canPlay, setCanPlay] = useState(false);
    const [activeDot, setActiveDot] = useState(null);
    const [currentFilm, setCurrentFilm] = useState(filmLists[0] || {});
    const handleScroll = (primarySelector, fallbackSelector) => {
        const targetElement = document.querySelector(primarySelector) || document.querySelector(fallbackSelector);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        } else {
            console.warn(`Neither "${primarySelector}" nor "${fallbackSelector}" were found.`);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCanPlay(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (filmLists.length > 0) {
            setCurrentFilm(filmLists[0]);
        }
    }, [filmLists]);

    const handleDotClick = (index) => {
        setActiveDot(index);
        setCurrentFilm(filmLists[index]);
    };

    return (
        <div className="main-slide">
            {filmLists.length > 1 && (
                <div className="dots-container">
                    <div className="dots">
                        {filmLists.map((film, index) => (
                            <p
                                key={film.movieId}
                                className={`dot ${activeDot === index ? "active" : ""}`}
                                onClick={() => handleDotClick(index)}
                            >
                                .
                            </p>
                        ))}
                    </div>
                </div>
            )}
            {canPlay ? <Trailer url={currentFilm.trailer || "" } onReady={() => setCanPlay(true)} /> : <FilmPoster img={currentFilm.poster || ""} />}
            <div className="cont-1">
                <h2>{currentFilm.name || "DUNE PART TWO"}</h2>
                <p className="genre">{currentFilm.genres && currentFilm.genres.length > 0
                    ? currentFilm.genres.map(genre => genre.name).join(', ')
                    : "Thriller"}</p>
                <p className="age">{currentFilm.ageRestricted || "16"}+</p>
            </div>
            <div className="cont-2">
                <div>
                    <Button to={currentFilm.trailer}>Watch full trailer</Button>
                    <Button onClick={() => handleScroll(".schedule-section", ".film-schedules")}>Book Ticket</Button>

                </div>
                <div>
                    <div>
                        <p className="description">
                            <span>Description: </span>{currentFilm.description || "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."}
                        </p>
                    </div>
                    <div>
                        {/*<p className="rating">{currentFilm.rating || "10/10"}</p>*/}
                        <p className="nation"><span>Country: </span>{currentFilm.country || "United States"}</p>
                        <p className="duration"><span>Duration: </span>{currentFilm.duration || "135"} minutes</p>
                        <p className="released-date"><span>Release Date: </span>{currentFilm.releaseDate || "20-09-2024"}</p>
                    </div>
                </div>
                <div>
                    <p className="director"><span>Director: </span> {currentFilm.director || "Denis Villeneuve"}</p>
                    <p className="stars"><span>Actors: </span> {currentFilm.actors || "Timothée Chalamet, Rebecca Ferguson, Zendaya"}</p>
                </div>
            </div>
        </div>
    );
}

{/*// <div className="option">*/}
{/*//     <Slogan />*/}
{/*//     <div className="sign-up">*/}
{/*//         <span>New Guest? <SignUpBtn>Sign Up</SignUpBtn></span>*/}
{/*//     </div>*/}
{/*// </div>*/}

MainSlide.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    filmLists: PropTypes.arrayOf(PropTypes.shape({
        movieId: PropTypes.number.isRequired,
        name: PropTypes.string,
        genres: PropTypes.arrayOf(object).isRequired,
        ageRestricted: PropTypes.number,
        description: PropTypes.string,
        country: PropTypes.string,
        duration: PropTypes.number,
        releaseDate: PropTypes.string,
        director: PropTypes.string,
        actors: PropTypes.string,
    })).isRequired,
};

export default MainSlide;