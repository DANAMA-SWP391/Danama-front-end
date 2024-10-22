import "./film-page.css";
import Header from "../../components/common/Header/Header.jsx";
import ScreenShotSlider from "../../components/common/ScreenShotSlider/ScreenShotSlider.jsx";
import screenshot1 from "../../assets/screen-shot/1.jpg";
import screenshot2 from "../../assets/screen-shot/2.jpg";
import screenshot3 from "../../assets/screen-shot/3.jpg";
import screenshot4 from "../../assets/screen-shot/4.jpg";
import screenshot5 from "../../assets/screen-shot/5.jpg";
import SeparateLine from "../../components/common/SeparateLine/SeparateLine.jsx";
import CommentSection from "../../components/container/film-page/CommentSection/CommentSection.jsx";

import FilmLists from "../../components/container/main-page/FilmLists/FilmLists.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../utils/userContext.jsx";
import MainSlide from "../../components/container/main-page/MainSlide/MainSlide.jsx";
import Schedule from "../../components/container/film-page/Schedule/Schedule.jsx";

import { useLocation } from "react-router-dom";
import {fetchDetailMovie} from "../../api/webAPI.jsx";

function FilmPage() {
    const location = useLocation();
    const { film } = location.state || {};
    const { user, filmList } = useContext(UserContext);
    const screenShots = [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5];

    const [isLogged, setIsLogged] = useState(false);
    const [showtimes, setShowtimes] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (user) {
            setIsLogged(true);
        }
    }, [user]);

    // Fetch movie details on component mount
    useEffect(() => {
        const getMovieDetails = async () => {
            if (film) {
                const data = await fetchDetailMovie(film.movieId);
                if (data) {
                    setShowtimes(data.showtimes || []);
                    setReviews(data.reviews || []);
                }
            }
        };

        getMovieDetails();
    }, [film]);
    console.log(reviews);
    return (
        <div className="film-page">
            <Header />
            <MainSlide isLogged={isLogged} film={film} />
            <ScreenShotSlider screenShots={screenShots} />
            <SeparateLine />
            <CommentSection user={user} reviews={reviews} movieId={film.movieId}/>
            <SeparateLine />
            <Schedule showtimes={showtimes} />
            <SeparateLine />
            <FilmLists filmLists={filmList} />
            <Footer />
        </div>
    );
}

export default FilmPage;