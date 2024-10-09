import "./Schedule.css";
import all from "../../../../assets/cinemaLogos/all.jpg";
import cgv from "../../../../assets/cinemaLogos/cgv.jpg";
import lotte from "../../../../assets/cinemaLogos/lotte.jpg";
import galaxy from "../../../../assets/cinemaLogos/galaxy.jpg";
import metiz from "../../../../assets/cinemaLogos/metiz.jpg";
import CinemaLogo from "../../../common/CinemaLogo/CinemaLogo.jsx";
import poster1 from "../../../../assets/posters/Joker2.jpg";
import FilmCard from "../FilmCard/FilmCard.jsx";
import Date from "../../../common/Date/Date.jsx";

function Schedule() {
    const cinemaLogoList = [[all, "All"], [cgv, "CGV"], [lotte, "Lotte"], [galaxy, "Galaxy"], [metiz, "Metiz"]];
    const filmList = [{ poster: poster1, name: "Joker: Folie à Deux", number: "1", genre: "Thriller, Comedy", schedule: "9:20 ~ 10:57", age: "18+" }];
    const dates = [["Today", 18], ["Wed", 19], ["Thu", 20], ["Fri", 21], ["Sat", 22], ["Sun", 23], ["Mon", 24]];

    return(
        <div className="schedule-section">
            <h1>Select Films on Schedule</h1>
            <div className="schedule-container">
                <div className="cinema-list">
                    {cinemaLogoList.map((logo, index) => {
                        return <CinemaLogo key={index} logo={logo[0]} name={logo[1]}/>
                    })}
                </div>
                <div className="films-list-container">
                    <div className="dates">
                        {dates.map((date, index) => {
                            return <Date key={index} date={date}/>
                        })}
                    </div>
                    <div className="films-list">
                        {filmList.map((film, index) => {
                            return <FilmCard key={index} film={film}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule;