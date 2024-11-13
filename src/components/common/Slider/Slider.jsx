import "./Slider.css";
import BackWardBtn from "../BackWardBtn/BackWardBtn.jsx";
import ForwardBtn from "../ForwardBtn/ForwardBtn.jsx";
import FilmCard from "../FilmCard/FilmCard.jsx";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Slider({ filmLists, defaultFilmsPerSlide = 4 }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [filmsPerSlide, setFilmsPerSlide] = useState(defaultFilmsPerSlide);
    const [isHover, setIsHover] = useState(false);

    // Handle window resizing for dynamic filmsPerSlide adjustment
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1200) {
                setFilmsPerSlide(4);
            } else if (width >= 768) {
                setFilmsPerSlide(3);
            } else {
                setFilmsPerSlide(2);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check on mount

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxSlideIndex = Math.ceil(filmLists.length / filmsPerSlide) - 1;

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev < maxSlideIndex ? prev + 1 : prev));
    };

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <div
            className="total-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="film-list-container">
                <BackWardBtn className={isHover ? "" : "hidden"} onClick={handlePrevSlide} />
                <ForwardBtn className={isHover ? "" : "hidden"} onClick={handleNextSlide} />
                <div
                    className="film-list"
                    style={{
                        width: `${(filmLists.length / filmsPerSlide) * 100}%`,
                        transform: `translateX(-${currentSlide * (100 / filmLists.length)}%)`,
                        transition: 'transform 0.75s ease-in-out',
                    }}
                >
                    {filmLists.map((film, index) => (
                        <FilmCard film={film} index={index} key={film.movieId} />
                    ))}
                </div>
            </div>
        </div>
    );
}

Slider.propTypes = {
    filmLists: PropTypes.arrayOf(
        PropTypes.shape({
            movieId: PropTypes.number.isRequired,
            poster: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            genres: PropTypes.array.isRequired,
        })
    ).isRequired,
    defaultFilmsPerSlide: PropTypes.number, // Optional prop to set default films per slide
};

export default Slider;
