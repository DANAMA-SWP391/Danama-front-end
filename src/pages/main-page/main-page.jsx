import "./main-page.css";
import Body from "../../components/container/main-page/Body/Body.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/userContext.jsx";
import Header from "../../components/common/Header/Header.jsx";
import PropTypes from "prop-types";

function MainPage() {
    const { user, filmList, setFilmList } = useContext(UserContext);

    const filmData = [
        {
            id: 1,
            name: "Joker: Folie à Deux",
            description: "Arthur Fleck returns in a chilling tale of madness as he dives further into the Joker persona.",
            poster: "/posters/Joker2.jpg",
            trailer: "/trailer/Joker2.mp4",
            rate: 8.0,
            genre: "Thriller, Comedy",
            releaseDate: "04/10/2024",
            country: "USA",
            director: "Todd Phillips",
            actors: "Joaquin Phoenix, Lady Gaga",
            duration: "2h 2min",
            status: "Playing",
            age: "18+",
        },
        {
            id: 2,
            name: "Slow Horses",
            description: "A team of British intelligence agents working on seemingly boring cases uncover a dark conspiracy.",
            poster: "/posters/SlowHorses.jpg",
            trailer: "/trailer/SlowHorses.mp4",
            rate: 7.6,
            genre: "Thriller",
            releaseDate: "15/09/2024",
            country: "UK",
            director: "James Hawes",
            actors: "Gary Oldman, Jack Lowden",
            duration: "1h 52min",
            status: "Playing",
            age: "16+",
        },
        {
            id: 3,
            name: "Dune Part Two",
            description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
            poster: "/posters/DunePartTwo.jpg",
            trailer: "/trailer/Dune2.mp4",
            rate: 8.3,
            genre: "Action, Adventure, Drama",
            releaseDate: "20/09/2024",
            country: "USA",
            director: "Denis Villeneuve",
            actors: "Timothée Chalamet, Rebecca Ferguson, Zendaya",
            duration: "2h 35min",
            status: "Playing",
            age: "13+",
        },
        {
            id: 4,
            name: "Napoleon",
            description: "An epic look at the life of Napoleon Bonaparte, tracing his rise to power and his eventual downfall.",
            poster: "/posters/Napoleon.jpg",
            trailer: "/trailer/Napoleon.mp4",
            rate: 7.9,
            genre: "Drama",
            releaseDate: "11/10/2024",
            country: "USA",
            director: "Ridley Scott",
            actors: "Joaquin Phoenix, Vanessa Kirby",
            duration: "2h 27min",
            status: "Playing",
            age: "15+",
        },
        {
            id: 5,
            name: "Alien Romulus",
            description: "A colony faces a terrifying invasion by an unknown alien species that threatens humanity's survival.",
            poster: "/posters/Alien.jpg",
            trailer: "/trailer/AlienRomulus.mp4",
            rate: 7.5,
            genre: "Horror",
            releaseDate: "31/10/2024",
            country: "USA",
            director: "Fede Alvarez",
            actors: "Cailee Spaeny, Isabela Merced",
            duration: "1h 55min",
            status: "Upcoming",
            age: "18+",
        },
        {
            id: 6,
            name: "Transformer One",
            description: "The origins of the Autobots and Decepticons are revealed in an epic animated battle for supremacy.",
            poster: "/posters/TransformerOne.jpg",
            trailer: "/trailer/TransformerOne.mp4",
            rate: 7.4,
            genre: "Animation, Action",
            releaseDate: "25/11/2024",
            country: "USA",
            director: "Josh Cooley",
            actors: "Chris Hemsworth, Scarlett Johansson",
            duration: "1h 40min",
            status: "Upcoming",
            age: "10+",
        },
        {
            id: 7,
            name: "The Crow",
            description: "A musician who was murdered returns to seek revenge against those who wronged him.",
            poster: "/posters/Crow.jpg",
            trailer: "/trailer/TheCrow.mp4",
            rate: 8.1,
            genre: "Thriller",
            releaseDate: "01/11/2024",
            country: "USA",
            director: "Rupert Sanders",
            actors: "Bill Skarsgård, FKA Twigs",
            duration: "1h 50min",
            status: "Upcoming",
            age: "16+",
        },
        {
            id: 8,
            name: "Batman",
            description: "Bruce Wayne returns to protect Gotham from a new threat while facing challenges in his personal life.",
            poster: "/posters/Batman.jpg",
            trailer: "/trailer/Batman.mp4",
            rate: 8.5,
            genre: "Action",
            releaseDate: "15/12/2024",
            country: "USA",
            director: "Matt Reeves",
            actors: "Robert Pattinson, Zoë Kravitz",
            duration: "2h 16min",
            status: "Upcoming",
            age: "13+",
        },
        {
            id: 9,
            name: "Mission: Impossible – Dead Reckoning Part One",
            description: "Ethan Hunt and his IMF team must track down a terrifying new weapon that threatens all of humanity.",
            poster: "/posters/MissionImpossible.jpg",
            trailer: "/trailer/MissionImpossible.mp4",
            rate: 8.2,
            genre: "Action, Adventure, Thriller",
            releaseDate: "12/07/2024",
            country: "USA",
            director: "Christopher McQuarrie",
            actors: "Tom Cruise, Hayley Atwell, Ving Rhames",
            duration: "2h 43min",
            status: "Playing",
            age: "13+",
        },
        {
            id: 10,
            name: "The Marvels",
            description: "Captain Marvel, Ms. Marvel, and Monica Rambeau team up to save the universe in this thrilling Marvel adventure.",
            poster: "/posters/TheMarvels.jpg",
            trailer: "/trailer/TheMarvels.mp4",
            rate: 7.1,
            genre: "Action, Adventure, Sci-Fi",
            releaseDate: "10/11/2024",
            country: "USA",
            director: "Nia DaCosta",
            actors: "Brie Larson, Iman Vellani, Teyonah Parris",
            duration: "1h 58min",
            status: "Playing",
            age: "10+",
        },
        {
            id: 11,
            name: "The Hunger Games: The Ballad of Songbirds & Snakes",
            description: "In this prequel to the Hunger Games, a young Coriolanus Snow takes center stage as a mentor in the deadly games.",
            poster: "/posters/HungerGamesPrequel.jpg",
            trailer: "/trailer/HungerGamesPrequel.mp4",
            rate: 7.8,
            genre: "Action, Adventure, Drama",
            releaseDate: "17/11/2024",
            country: "USA",
            director: "Francis Lawrence",
            actors: "Tom Blyth, Rachel Zegler, Peter Dinklage",
            duration: "2h 37min",
            status: "Playing",
            age: "15+",
        },
        {
            id: 12,
            name: "Oppenheimer",
            description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
            poster: "/posters/Oppenheimer.jpg",
            trailer: "/trailer/Oppenheimer.mp4",
            rate: 8.6,
            genre: "Biography, Drama, History",
            releaseDate: "21/07/2024",
            country: "USA",
            director: "Christopher Nolan",
            actors: "Cillian Murphy, Emily Blunt, Matt Damon",
            duration: "3h",
            status: "Playing",
            age: "18+",
        }
    ];

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if (filmList.length === 0) {
            setFilmList(filmData);
        }
    }, [filmList, setFilmList]);

    useEffect(() => {
        setIsLogged(!!user);
    }, [user]);

    return (
        <div className="main-page">
            <Header user={user} />
            <Body isLogged={isLogged} filmLists={filmList} />
            <Footer />
        </div>
    );
}

MainPage.propTypes = {
    // user: PropTypes.object.isRequired,
};

export default MainPage;