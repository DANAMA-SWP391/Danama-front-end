import "./OptionList.css";
import {useContext, useState} from "react";
import {UserContext} from "../../../../utils/userContext.jsx";
import {WebContext} from "../../../../utils/webContext.jsx";
import FilmCard from "../../../common/FilmCard/FilmCard.jsx";

function OptionList() {
    const { user } = useContext(UserContext);
    const { filmList } = useContext(WebContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFilms, setFilteredFilms] = useState([]);

    const handleScroll = (selector, event) => {
        event.preventDefault();
        document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Filter films based on search term
        if (term) {
            const results = filmList.filter(film =>
                film.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredFilms(results.slice(0, 5)); // Limit to 5 results
        } else {
            setFilteredFilms([]);
        }
    };

    const handleFilmSelect = (film) => {
        console.log("Selected film:", film);
        setSearchTerm(""); // Clear the search term
        setFilteredFilms([]); // Clear the dropdown
    };
    return (
        <div className="option-list">
            <div className="option">
                <a href="/film-list">Films</a>
            </div>

            {user?.roleId === 2 && (
                <div className="option">
                    <a href="/Cmanager">Management</a>
                </div>
            )}

            {user?.roleId === 1 && (
                <div className="option">
                    <a href="/admin-dashboard">Admin</a>
                </div>
            )}
            <div className="option">
                <a href="" onClick={(e) => handleScroll(".schedule-section", e)}>Schedules</a>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search films..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {searchTerm && filteredFilms.length > 0 && (
                    <div className="film-dropdown-overlay">
                        {filteredFilms.map((film, index) => (
                            <div
                                key={film.id}
                                onClick={() => handleFilmSelect(film)}
                            >
                                <FilmCard film={film} index={index}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}

export default OptionList;