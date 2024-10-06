import "./Slider.css";
import BackWardBtn from "../BackWardBtn/BackWardBtn.jsx";
import ForwardBtn from "../ForwardBtn/ForwardBtn.jsx";
import FilmCard from "../FilmCard/FilmCard.jsx";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Slider({ nowPlayingFilms }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [filmsPerSlide, setFilmsPerSlide] = useState(4);
    const [isHover, setIsHover] = useState(false);

    const totalSlides = Math.ceil(nowPlayingFilms.length / filmsPerSlide);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setFilmsPerSlide(2);
            } else {
                setFilmsPerSlide(4);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    return (
        <div className="total-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <BackWardBtn className={isHover ? "" : "hidden"} onClick={handlePrevSlide}/>
            <ForwardBtn className={isHover ? "" : "hidden"} onClick={handleNextSlide} s/>
            <div className="film-list-container" >
                <div
                    className="film-list"
                    style={{
                        transform: `translateX(-${currentSlide * (100 / filmsPerSlide)}%)`,
                        width: `${(nowPlayingFilms.length / filmsPerSlide) * 100}%`,
                        transition: 'transform 0.5s ease-in-out',
                    }}
                >
                    {nowPlayingFilms.map((film) => (
                        <FilmCard
                            key={film.id}
                            poster={film.poster}
                            name={film.name}
                            number={film.number}
                            genre={film.genre}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

Slider.propTypes = {
    nowPlayingFilms: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            poster: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            genre: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Slider;
