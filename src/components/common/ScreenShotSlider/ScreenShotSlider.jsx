import "./ScreenShotSlider.css";
import BackWardBtn from "../BackWardBtn/BackWardBtn.jsx";
import ForwardBtn from "../ForwardBtn/ForwardBtn.jsx";
import ScreenShotCard from "../ScreenShotCard/ScreenShotCard.jsx";
import PropTypes from 'prop-types';
import {useState} from "react";

function ScreenShotSlider({screenShots}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imagesPerSlide] = useState(3);
    const [isHover, setIsHover] = useState(false);

    const handlePrevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleNextSlide = () => {
        if (currentSlide < Math.ceil(screenShots.length / imagesPerSlide) - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    }

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    return(
        <div className="totally-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h1>Screen shots</h1>
            <BackWardBtn className={isHover ? "" : "hidden"} onClick={handlePrevSlide}/>
            <ForwardBtn className={isHover ? "" : "hidden"} onClick={handleNextSlide}/>
            <div className="screen-shot-slider">
                <div className="screen-shot-list-container" style={{
                    width: `${Math.ceil(screenShots.length / 3) * 100}%`,
                    transform: `translateX(-${currentSlide * (100 / imagesPerSlide)}%)`,
                    transition: 'transform 0.5s ease-in-out',
                }}>
                    {screenShots.map((screenShot, index) => (
                        <ScreenShotCard key={index} screenShot={screenShot}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

ScreenShotSlider.propTypes = {
    screenShots: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ScreenShotSlider;