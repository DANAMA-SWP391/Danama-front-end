import "./BookingInfo.css";

import PropTypes from 'prop-types';
import Button from "../../../common/Button/Button.jsx";
import CancelBtn from "../../../../assets/Icons/cancel.svg";

const BookingInfo = ({ film, handleClick }) => (
    <div className="booking-info">
        <div className="film-info">
            <div className="head">
                <div className="age"><p>{film.age}</p></div>
                <div className="film-name"><p>{film.name}</p></div>
            </div>
            <div className="body">
                <p>15:30 ~ 17:30</p> . <p>23/10/2024</p> . <p>Room Cinema 1</p> . <p>2D Subtitle</p>
            </div>
        </div>
        <div className="seat-infos">
            <p>Seat: </p>
            <div>
                <p>E8</p>
                <img src={CancelBtn} alt="cancel-btn"/>
            </div>
        </div>
        <div className="price"><p>Price: 100.000đ</p></div>
        <Button onClick={handleClick}>Purchase</Button>
    </div>
);

BookingInfo.propTypes = {
    film: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default BookingInfo;