import "./FilmPoster.css";

function FilmPoster({img}) {
    return(
        <div className="film-poster">
            <img src={img} alt="Dune 2"/>
        </div>
    )
}

export default FilmPoster;