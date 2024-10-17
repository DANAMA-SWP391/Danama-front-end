import "./FilmCard.css";

function FilmCard({ film }) {
    return(
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
                            <div className="schedule">
                                <p>9:20 ~ 10:57</p>
                                <p>Price: 100.000đ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmCard;