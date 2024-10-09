import "./FilmPoster.css";


import wallpaper from "../../../assets/walpaper/dune2.jpg";
import Button from "../Button/Button.jsx";

function FilmPoster() {
    return(
        <div className="film-poster">
            <img src={wallpaper} alt="Dune 2"/>
            <div className="cont-1">
                <h2>DUNE PART TWO</h2>
                <p className="genre">Thriller</p>
                <p className="age">16+</p>
            </div>

            <div className="cont-2">
                <div>
                    <Button>Watch Trailer</Button>
                    <Button>Book Ticket</Button>
                </div>

                <div>
                    <div>
                        <p className="description">
                            Paul Atreides unites with Chani and the Fremen while seeking revenge against the
                            conspirators
                            who destroyed his family.
                        </p>
                    </div>
                    <div>
                        <p className="rating">10/10</p>
                        <p className="nation">United States</p>
                        <p className="duration">2h15p</p>
                        <p className="released-date">20-09-2024</p>
                        <p className="formatted">2D</p>
                    </div>
                </div>

                <div>
                    <p className="director"><span>Director:</span> Denis Villeneuve</p>
                    <p className="stars"><span>Starring</span> Timothée Chalamet, Rebecca Ferguson, Zendaya</p>
                </div>

            </div>
        </div>
    )
}

export default FilmPoster;