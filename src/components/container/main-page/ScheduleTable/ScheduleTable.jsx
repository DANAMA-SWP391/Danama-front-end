import './ScheduleTable.css';

import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button.jsx';
import Price from '../../../../assets/Icons/priceTag.svg';
import Location from '../../../../assets/Icons/location.svg';
import ArrowUp from '../../../../assets/Icons/arrow-upward.svg';
import Date from "../../../common/Date/Date.jsx";
import FilmCard from "../FilmCard/FilmCard.jsx";

function ScheduleTable({ dates, filmList }) {
    return (
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
    );
}

ScheduleTable.propTypes = {
    dates: PropTypes.array.isRequired,
    filmList: PropTypes.array.isRequired,
};

export default ScheduleTable;