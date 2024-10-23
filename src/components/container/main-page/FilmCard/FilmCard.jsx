import "./FilmCard.css";
import PropTypes from 'prop-types';
import { useState } from "react";
import BackSpace from '../../../../assets/Icons/back-space.svg';
import Seat from "../../../common/Seat/Seat.jsx";
import Button from "../../../common/Button/Button.jsx";
import CancelBtn from "../../../../assets/Icons/cancel.svg";
import SeatLayout from "../SeatLayout/SeatLayout.jsx";
import BookingInfo from "../BookingInfo/BookingInfo.jsx";

function FilmCard({ film }) {
    const [isClick, setIsClick] = useState(false);
    const seats = [
        [
            { seat: "A1", status: "normal" },
            { seat: "A2", status: "normal" },
            null,
            { seat: "A4", status: "vip" },
            { seat: "A5", status: "normal" },
            { seat: "A6", status: "normal" },
            { seat: "A7", status: "normal" },
            null,
            { seat: "A9", status: "already booked" },
            { seat: "A10", status: "normal" },
            { seat: "A11", status: "normal" },
            { seat: "A12", status: "selected" },
            { seat: "A13", status: "normal" },
            null,
            { seat: "A16", status: "normal" },
            { seat: "A17", status: "normal" }
        ],
        [
            { seat: "B1", status: "normal" },
            { seat: "B2", status: "normal" },
            null,
            { seat: "B4", status: "vip" },
            { seat: "B5", status: "normal" },
            { seat: "B6", status: "normal" },
            { seat: "B7", status: "normal" },
            null,
            { seat: "B9", status: "already booked" },
            { seat: "B10", status: "normal" },
            { seat: "B11", status: "normal" },
            { seat: "B12", status: "selected" },
            { seat: "B13", status: "normal" },
            null,
            { seat: "B16", status: "normal" },
            { seat: "B17", status: "normal" }
        ],
        [
            { seat: "C1", status: "normal" },
            { seat: "C2", status: "normal" },
            null,
            { seat: "C4", status: "vip" },
            { seat: "C5", status: "normal" },
            { seat: "C6", status: "normal" },
            { seat: "C7", status: "normal" },
            null,
            { seat: "C9", status: "already booked" },
            { seat: "C10", status: "normal" },
            { seat: "C11", status: "normal" },
            { seat: "C12", status: "selected" },
            { seat: "C13", status: "normal" },
            null,
            { seat: "C16", status: "normal" },
            { seat: "C17", status: "normal" }
        ],
        [
            { seat: "D1", status: "normal" },
            { seat: "D2", status: "normal" },
            null,
            { seat: "D4", status: "vip" },
            { seat: "D5", status: "normal" },
            { seat: "D6", status: "normal" },
            { seat: "D7", status: "normal" },
            null,
            { seat: "D9", status: "already booked" },
            { seat: "D10", status: "normal" },
            { seat: "D11", status: "normal" },
            { seat: "D12", status: "selected" },
            { seat: "D13", status: "normal" },
            null,
            { seat: "D16", status: "normal" },
            { seat: "D17", status: "normal" }
        ],
        [
            { seat: "E1", status: "normal" },
            { seat: "E2", status: "normal" },
            null,
            { seat: "E4", status: "vip" },
            { seat: "E5", status: "normal" },
            { seat: "E6", status: "normal" },
            { seat: "E7", status: "normal" },
            null,
            { seat: "E9", status: "already booked" },
            { seat: "E10", status: "normal" },
            { seat: "E11", status: "normal" },
            { seat: "E12", status: "selected" },
            { seat: "E13", status: "normal" },
            null,
            { seat: "E16", status: "normal" },
            { seat: "E17", status: "normal" }
        ],
        [
            { seat: "F1", status: "normal" },
            { seat: "F2", status: "normal" },
            null,
            { seat: "F4", status: "vip" },
            { seat: "F5", status: "normal" },
            { seat: "F6", status: "normal" },
            { seat: "F7", status: "normal" },
            null,
            { seat: "F9", status: "already booked" },
            { seat: "F10", status: "normal" },
            { seat: "F11", status: "normal" },
            { seat: "F12", status: "selected" },
            { seat: "F13", status: "normal" },
            null,
            { seat: "F16", status: "normal" },
            { seat: "F17", status: "normal" }
        ]
    ];

    const seatsInfo = [
        ["Already booked", "black"], ["Selected", "#BCB3B3"], ["Normal", "#1BA0D4"], ["Vip", "#D64242"]
    ];

    const getSeatColor = (status) => {
        switch (status) {
            case 'already booked': return 'black';
            case 'selected': return '#BCB3B3';
            case 'vip': return '#D64242';
            default: return '#1BA0D4';
        }
    };

    const handleClick = () => setIsClick(!isClick);

    return (
        <div className={`wrapper ${isClick ? 'darken' : ''}`}>
            {isClick && <div className="overlay"></div>}
            {isClick && (
                <div className="book-ticket-container">
                    <img src={BackSpace} alt="back-space" onClick={handleClick}/>
                    <h2>Book Ticket</h2>
                    <SeatLayout handleClick={handleClick} getSeatColor={getSeatColor} seats={seats} />
                    <div className="seats-info">
                        {seatsInfo.map((info, index) => (
                            <div className="info" key={index}>
                                <div className="color" style={{backgroundColor: info[1]}}></div>
                                <p>{info[0]}</p>
                            </div>
                        ))}
                    </div>
                    <BookingInfo  handleClick={handleClick} film={film}/>
                </div>
            )}
            <div className="schedule-film">
                <img src={film.poster} alt="film poster"/>
                <div className="film-info">
                    <p className="film-age">{film.age}</p>
                    <p className="film-name">{film.name}</p>
                    <p className="film-genre">{film.genre}</p>
                    <div className="film-schedule">
                        <div className="format">
                            <p>2D subtitle</p>
                            <div className="schedules">
                                <div className="schedule" onClick={handleClick}>
                                    <p>9:20 ~ 10:57</p>
                                    <p>Price: 100.000đ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

FilmCard.propTypes = {
    film: PropTypes.shape({
        poster: PropTypes.string.isRequired,
        age: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
    }).isRequired,
};

export default FilmCard;