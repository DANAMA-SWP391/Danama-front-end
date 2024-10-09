import "./FilmCard.css";
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function FilmCard({poster, number, name, genre}) {
    return (
        <Link to={"/film-page"} className={"film-card"}>
            <div className="poster">
                <img src={poster} alt={name}/>
            </div>
            <div className="info">
                <h2>{number}</h2>
                <div className="other-infos">
                    <div className="name">{name}</div>
                    <div className="genre">{genre}</div>
                </div>
            </div>
        </Link>
    );
}

export default FilmCard;