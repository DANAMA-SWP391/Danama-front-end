import { useState, useEffect } from 'react';
import "./MainSlide.css";
import Trailer from "../../../common/Trailer/Trailer.jsx";
import Slogan from "../../../common/Slogan 2/Slogan 2.jsx";
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import FilmPoster from "../../../common/FilmPoster/FilmPoster.jsx";
import Button from "../../../common/Button/Button.jsx";
import PropTypes from "prop-types";

function MainSlide({ isLogged, filmLists = [] }) {
    const [canPlay, setCanPlay] = useState(false);
    const [activeDot, setActiveDot] = useState(null);
    const [currentFilm, setCurrentFilm] = useState(filmLists[0] || {});

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
                                key={film.id}
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
                <p className="genre">{currentFilm.genre || "Thriller"}</p>
                <p className="age">{currentFilm.age || "16+"}</p>
            </div>
            <div className="cont-2">
                <div>
                    <Button to={currentFilm.trailer}>See more details</Button>
                    <Button>Book Ticket</Button>
                </div>
                <div>
                    <div>
                        <p className="description">
                            {currentFilm.description || "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."}
                        </p>
                    </div>
                    <div>
                        <p className="rating">{currentFilm.rating || "10/10"}</p>
                        <p className="nation">{currentFilm.nation || "United States"}</p>
                        <p className="duration">{currentFilm.duration || "2h15p"}</p>
                        <p className="released-date">{currentFilm.releaseDate || "20-09-2024"}</p>
                        <p className="formatted">{currentFilm.formatted || "2D"}</p>
                    </div>
                </div>
                <div>
                    <p className="director"><span>Director:</span> {currentFilm.director || "Denis Villeneuve"}</p>
                    <p className="stars"><span>Starring</span> {currentFilm.stars || "Timothée Chalamet, Rebecca Ferguson, Zendaya"}</p>
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
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        genre: PropTypes.string,
        age: PropTypes.string,
        description: PropTypes.string,
        rating: PropTypes.string,
        nation: PropTypes.string,
        duration: PropTypes.string,
        releaseDate: PropTypes.string,
        formatted: PropTypes.string,
        director: PropTypes.string,
        stars: PropTypes.string,
    })).isRequired,
};

export default MainSlide;