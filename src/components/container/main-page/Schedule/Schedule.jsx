import "./Schedule.css";
import all from "../../../../assets/cinemaLogos/all.jpg";
import cgv from "../../../../assets/cinemaLogos/cgv.jpg";
import lotte from "../../../../assets/cinemaLogos/lotte.jpg";
import galaxy from "../../../../assets/cinemaLogos/galaxy.jpg";
import metiz from "../../../../assets/cinemaLogos/metiz.jpg";

import CinemaLogo from "../../../common/CinemaLogo/CinemaLogo.jsx";
import poster1 from "../../../../../public/posters/Joker2.jpg";
import FilmCard from "../FilmCard/FilmCard.jsx";
import Date from "../../../common/Date/Date.jsx";
import SeparateLine from "../../../common/SeparateLine/SeparateLine.jsx";
import Button from "../../../common/Button/Button.jsx";

import Price from "../../../../assets/Icons/priceTag.svg";
import Location from "../../../../assets/Icons/location.svg";
import ArrowUp from "../../../../assets/Icons/arrow-upward.svg";
import ArrowDown from "../../../../assets/Icons/arrow_downward.svg";

function Schedule() {
    const cinemaLogoList = [[all, "All"], [cgv, "CGV"], [lotte, "Lotte"], [galaxy, "Galaxy"], [metiz, "Metiz"]];
    const filmList = [{ poster: poster1, name: "Joker: Folie à Deux", number: "1", genre: "Thriller, Comedy", schedule: "9:20 ~ 10:57", age: "18+" }];
    const dates = [["Today", 18], ["Wed", 19], ["Thu", 20], ["Fri", 21], ["Sat", 22], ["Sun", 23], ["Mon", 24]];

    return(
        <div className="schedule-section">
            <SeparateLine/>
            <h1>Select Films on Schedule</h1>
            <div className="cinema-list">
                {cinemaLogoList.map((logo, index) => {
                    return <CinemaLogo key={index} logo={logo[0]} name={logo[1]}/>
                })}
            </div>
            <div className="line"></div>
            <table>
                <thead>
                <tr>
                    <th>
                        <div className="buttons-cont">
                            <Button><img src={Price} alt={"price"}/> Price <img src={ArrowUp} alt={"arrow-up"}/>
                            </Button>
                            <Button>Near You <img src={Location} alt={"near-you"}/> </Button>
                        </div>
                    </th>
                    <th>
                        <div className="cinematic-info">
                            <h2>Schedule of CGV Vincom Đà Nẵng< /h2>
                            <p>
                                Tầng 4, TTTM Vincom Đà Nẵng, đường Ngô Quyền, P.An Hải Bắc, Q.Sơn Trà, TP. Đà Nẵng
                            </p>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div className="cinema-list-box">
                            <div className="cinema">
                                <p className="name">
                                    CGV Vincom Đà Nẵng
                                </p>
                                <p className="best-price">
                                    Best price: 100.000đ
                                </p>
                            </div>
                            <div className="cinema">
                                <p className="name">
                                    CGV Vĩnh Trung Plaza
                                </p>
                                <p className="best-price">
                                    Best price: 100.000đ
                                </p>
                            </div>
                        </div>
                    </td>
                    <td>
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
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="schedule-container">

            </div>
        </div>
    )
}

export default Schedule;