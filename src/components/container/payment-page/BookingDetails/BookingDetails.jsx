import "./BookingDetails.css";
import Button from "../../../common/Button/Button.jsx";
import FilmDetails from "../FilmDetails/FilmDetails.jsx";
import TimeDetails from "../TimeDetails/TimeDetails.jsx"
import CinemaDetails from "../CinemaDetails/CinemaDetails.jsx";
import SeatDetails from "../SeatDetails/SeatDetails.jsx";
import TotalDetails from "../TotalDetails/TotalsDetails.jsx";

function BookingDetails() {

    return (
        <div className="body__booking-details">

            <h2>Booking details</h2>
            <FilmDetails />
            <TimeDetails />
            <CinemaDetails />
            <SeatDetails />
            <TotalDetails />
            <Button>Purchases</Button>
        </div>
    );
}

export default BookingDetails;