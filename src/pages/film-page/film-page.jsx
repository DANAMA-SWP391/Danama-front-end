import "./film-page.css";
import Header from "../../components/common/Header/Header.jsx";
import SeparateLine from "../../components/common/SeparateLine/SeparateLine.jsx";
import CommentSection from "../../components/container/film-page/CommentSection/CommentSection.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../utils/userContext.jsx";
import MainSlide from "../../components/container/main-page/MainSlide/MainSlide.jsx";
import Schedule from "../../components/container/film-page/Schedule/Schedule.jsx";

import { useLocation } from "react-router-dom";
import {WebContext} from "../../utils/webContext.jsx";
import {fetchDetailMovie} from "../../api/webAPI.jsx";
import ListFilms from "../../components/container/film-list-page/ListFilms/ListFilms.jsx";

function FilmPage() {
    const location = useLocation();
    const {filmList} = useContext(WebContext);
    const { film } = location.state || {};
    const { user } = useContext(UserContext);
    const {showtimeList} = useContext(WebContext);
    const [isLogged, setIsLogged] = useState(false);
    const showtimes = showtimeList?.filter(showtime => showtime.movie.movieId === film.movieId) || [];
    const [reviews,setReviews] = useState([]);
    const randomTop5Films = filmList
        .sort(() => 0.4 - Math.random())
        .slice(0, 5);
    useEffect(() => {
        if (user) {
            setIsLogged(true);
        }
    }, [user]);

    // Fetch movie details on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
        const getMovieDetails = async () => {
            if (film) {
                const data = await fetchDetailMovie(film.movieId);
                if (data) {
                    setReviews(data.reviews || []);
                }
            }
        };

        getMovieDetails();
    }, [film]);

    return (
        <div className="film-page">
            <Header />
            <MainSlide isLogged={isLogged} filmLists={[film]} />
            {/*<ScreenShotSlider screenShots={screenShots} />*/}
            <SeparateLine />
            <CommentSection reviews={reviews} movieId={film.movieId}/>
            <SeparateLine />
            <Schedule showtimes={showtimes} film={film} />
            <SeparateLine />
            <div className="others-films">
                <h2>Others Films</h2>
                <ListFilms filteredFilms={randomTop5Films}/>
            </div>
            <Footer/>
        </div>
    );
}

export default FilmPage;