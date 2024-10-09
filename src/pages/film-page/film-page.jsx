import "./film-page.css";
import NotLoggedHeader from "../../components/common/NotLoggedHeader/NotLoggedHeader.jsx";
import FilmPoster from "../../components/common/FilmPoster/FilmPoster.jsx";
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

function FilmPage() {

    const screenShots = [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5];

    return (
        <div className="film-page">
            <NotLoggedHeader />
            <FilmPoster />
            <ScreenShotSlider screenShots={screenShots} />
            <SeparateLine />
            <CommentSection />
            <SeparateLine/>
            <FilmLists/>
            <Footer />
        </div>
    );
}

export default FilmPage;