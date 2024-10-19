import "./Schedule.css";
import all from "../../../../assets/cinemaLogos/all.jpg";
import cgv from "../../../../assets/cinemaLogos/cgv.jpg";
import lotte from "../../../../assets/cinemaLogos/lotte.jpg";
import galaxy from "../../../../assets/cinemaLogos/galaxy.jpg";
import metiz from "../../../../assets/cinemaLogos/metiz.jpg";
import Date from "../../../common/Date/Date.jsx";

function Schedule() {

    const cinemaLogoList = [[all, "All"], [cgv, "CGV"], [lotte, "Lotte"], [galaxy, "Galaxy"], [metiz, "Metiz"]];
    const dates = [["Today", 18], ["Wed", 19], ["Thu", 20], ["Fri", 21], ["Sat", 22], ["Sun", 23], ["Mon", 24]];

    return(
        <div className={"film-schedules"}>
            <h1>Schedules for Dune Part Two</h1>
            <div className="dates">
                {dates.map((date, index) => {
                    return <Date key={index} date={date}/>
                })}
            </div>
            <div className="schedule-container">
                <div className="cinema-list">
                    {cinemaLogoList.map((logo, index) => {
                        return <div key={index} className="cinema-logo">
                            <div>
                                <img src={logo[0]} alt={logo[1]}/>
                                <p>{logo[1]}</p>
                            </div>
                            <p>Best Price: 100.000đ</p>
                        </div>
                    })}
                </div>
                <div className="schedules">
                    <div className="button-cont">
                        <button>Price</button>
                        <button>Near You</button>
                    </div>
                    <div className="schedule">
                        <h2>CGV Vincom Đà Nẵng</h2>
                        <p className={"address"}>Tầng 4, TTTM Vincom Đà Nẵng, đường Ngô Quyền, P.An Hải Bắc, Q.Sơn Trà, TP. Đà Nẵng</p>
                        <p className="format">2D Subtitle</p>
                        <div className="showtimes">
                            <div className="showtime">
                                <p className={"time"}>9:20 ~ 10:57</p>
                                <p className={"price"}>Best Price: 100.000đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="schedule">
                        <h2>CGV Vĩnh Trung Plaza</h2>
                        <p>255-257 Hùng Vương, Phường Vĩnh Trung, Quận Thanh Khê, TP. Đà Nẵng</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;