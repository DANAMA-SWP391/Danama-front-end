import "./main-page.css";
import Body from "../../components/container/main-page/Body/Body.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/userContext.jsx";
import Header from "../../components/common/Header/Header.jsx";
import PropTypes from "prop-types";
import {fetchMoviePage} from "../../api/webAPI.jsx";

function MainPage() {
    const { user, filmList, setFilmList } = useContext(UserContext);
    const [isLogged, setIsLogged] = useState(false);

    // Function to fetch the film list and update the context
    const getFilmList = async () => {
        try {
            // Fetch the film list using the fetchMoviePage API call
            const fetchedMovies = await fetchMoviePage();
            // Update the film list in the context
            setFilmList(fetchedMovies);
        } catch (error) {
            console.error('Error fetching film list:', error);
        }
    };

    useEffect(() => {
            getFilmList();
    }, );

    useEffect(() => {
        setIsLogged(!!user);
    }, [user]);

    return (
        <div className="main-page">
            <Header />
            <Body isLogged={isLogged} filmLists={filmList} />
            <Footer />
        </div>
    );
}

MainPage.propTypes = {
    user: PropTypes.object.isRequired,
};

export default MainPage;
