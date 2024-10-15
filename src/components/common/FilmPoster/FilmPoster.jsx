import "./FilmPoster.css";


import wallpaper from "../../../assets/walpaper/dune2.jpg";

function FilmPoster() {
    return(
        <div className="film-poster">
            <img src={wallpaper} alt="Dune 2"/>
        </div>
    )
}

export default FilmPoster;