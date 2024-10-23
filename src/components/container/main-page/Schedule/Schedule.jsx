import "./Schedule.css";
import all from "../../../../assets/cinemaLogos/all.jpg";
import cgv from "../../../../assets/cinemaLogos/cgv.jpg";
import lotte from "../../../../assets/cinemaLogos/lotte.jpg";
import galaxy from "../../../../assets/cinemaLogos/galaxy.jpg";
import metiz from "../../../../assets/cinemaLogos/metiz.jpg";

import poster1 from "../../../../../public/posters/Joker2.jpg";

import SeparateLine from "../../../common/SeparateLine/SeparateLine.jsx";

import CinemaLogoList from "../CinemaLogoList/CinemaLogoList.jsx";
import ScheduleTable from "../ScheduleTable/ScheduleTable.jsx";

function Schedule() {
    const cinemaLogoList = [[all, "All"], [cgv, "CGV"], [lotte, "Lotte"], [galaxy, "Galaxy"], [metiz, "Metiz"]];
    const filmList = [{ poster: poster1, name: "Joker: Folie à Deux", number: "1", genre: "Thriller, Comedy", schedule: "9:20 ~ 10:57", age: "18+" }];
    const dates = [["Today", 18], ["Wed", 19], ["Thu", 20], ["Fri", 21], ["Sat", 22], ["Sun", 23], ["Mon", 24]];

    return(
        <div className="schedule-section">
            <SeparateLine/>
            <h1>Select Films on Schedule</h1>
           <CinemaLogoList cinemaLogoList={cinemaLogoList} />
            <div className="line"></div>
            <ScheduleTable filmList={filmList} dates={dates} />
        </div>
    )
}

export default Schedule;