import "./FilmLists.css";

import poster1 from "../../../../assets/posters/Joker2.jpg";
import poster2 from "../../../../assets/posters/SlowHorses.jpg";
import poster3 from "../../../../assets/posters/DunePartTwo.jpg";
import poster4 from "../../../../assets/posters/Napoleon.jpg";
import poster5 from "../../../../assets/posters/Alien.jpg";
import poster6 from "../../../../assets/posters/TransformerOne.jpg";
import poster7 from "../../../../assets/posters/Crow.jpg";
import poster8 from "../../../../assets/posters/Batman.jpg";

import Slider from "../../../common/Slider/Slider.jsx";
import SeparateLine from "../../../common/SeparateLine/SeparateLine.jsx";

function FilmLists() {
    const nowPlayingFilms = [
        { poster: poster1, name: "Joker: Folie à Deux", number: "1", genre: "Thriller, Comedy" },
        { poster: poster2, name: "Slow Horses", number: "2", genre: "Thriller" },
        { poster: poster3, name: "Dune Part Two", number: "3", genre: "Thriller" },
        { poster: poster4, name: "Napoleon", number: "4", genre: "Drama" },
        { poster: poster5, name: "Alien Romulus", number: 1, genre: "Horror" },
        { poster: poster6, name: "Transformer One", number: 2, genre: "Animation . Action" },
        { poster: poster7, name: "The Crow", number: 3, genre: "Thriller" },
        { poster: poster8, name: "Batman", number: 4, genre: "Action" }
    ];

    const upcomingFilms = [
        { poster: poster5, name: "Alien Romulus", number: 1, genre: "Horror" },
        { poster: poster6, name: "Transformer One", number: 2, genre: "Animation . Action" },
        { poster: poster7, name: "The Crow", number: 3, genre: "Thriller" },
        { poster: poster8, name: "Batman", number: 4, genre: "Action" }
    ]

    return (
        <div className="film-lists">
            <div className="now-playing-films">
                <h2>Now Playing</h2>
                <Slider nowPlayingFilms={nowPlayingFilms} />
            </div>

            <span className="separate-line"></span>

            <div className="upcoming-films">
                <h2>Upcoming</h2>
                <Slider nowPlayingFilms={upcomingFilms} />
            </div>
        </div>
    );
}

export default FilmLists;
