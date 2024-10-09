import { useState, useEffect } from 'react';
import "./MainSlide.css";
import Trailer from "../../../common/Trailer/Trailer.jsx";
import Slogan from "../../../common/Slogan 2/Slogan 2.jsx";
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import FilmPoster from "../../../common/FilmPoster/FilmPoster.jsx";

function MainSlide() {

    const [canPlay, setCanPlay] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCanPlay(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="main-slide">
            {
                canPlay ?
                    <>
                        <Trailer/>

                    </>
                    : <FilmPoster/>
            }

            <div className="option">
                <Slogan/>
                <div className="sign-up">
                    <span>New Guest? <SignUpBtn>Sign Up</SignUpBtn></span>
                </div>
            </div>
        </div>
    );
}

export default MainSlide;
