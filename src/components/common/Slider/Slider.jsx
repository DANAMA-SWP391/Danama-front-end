import "./Slider.css";
import BackWardBtn from "../BackWardBtn/BackWardBtn.jsx";
import ForwardBtn from "../ForwardBtn/ForwardBtn.jsx";
import FilmCard from "../FilmCard/FilmCard.jsx";
import { useState } from "react";
import PropTypes, {object} from "prop-types";

function Slider({ filmLists }) {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [filmsPerSlide] = useState(4);
    const [isHover, setIsHover] = useState(false);

    const handlePrevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleNextSlide = () => {
        if (currentSlide < Math.ceil(filmLists.length / filmsPerSlide) - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    return (
        <>
            <div className="total-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="film-list-container">
                    <BackWardBtn className={isHover ? "" : "hidden"} onClick={handlePrevSlide}/>
                    <ForwardBtn className={isHover ? "" : "hidden"} onClick={handleNextSlide}/>
                    <div
                        className="film-list"
                        style={{
                            width: `${((filmLists.length - 0.25) / filmsPerSlide) * 100}%`,
                            transform: `translateX(-${currentSlide * (100 / filmsPerSlide)}%)`,
                            transition: 'transform 0.75s ease-in-out',
                        }}
                    >
                        {filmLists.map((film, index) => (
                            <FilmCard film={film} index={index} key={film.movieId}
                                // key={film.id}
                                // poster={film.poster}
                                // name={film.name}
                                // number={index + 1}
                                // genre={film.genre}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Slider.propTypes = {
    filmLists: PropTypes.arrayOf(
        PropTypes.shape({
            movieId: PropTypes.number.isRequired,
            poster: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            genres: PropTypes.arrayOf(object).isRequired,
        })
    ).isRequired,
};

export default Slider;