import "./FilmCard.css";

function FilmCard({ film }) {
    return(
        <div className="schedule-film">
            <img src={film.poster} alt="film poster"/>
            <div className="film-info">
                <p className="film-age">{film.age}</p>
                <p className="film-name">{film.name}</p>
                <p className="film-genre">{film.genre}</p>
                <p className="film-schedule">{film.schedule}</p>
            </div>
        </div>
    )
}

export default FilmCard;