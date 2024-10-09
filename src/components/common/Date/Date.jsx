import "./Date.css";

// eslint-disable-next-line react/prop-types
function Date({ date }) {
    return (
        <div className="date-box">
            <p className="day">{date[1]}</p>
            <p className="date">{date[0]}</p>
        </div>
    )
}

export default Date;