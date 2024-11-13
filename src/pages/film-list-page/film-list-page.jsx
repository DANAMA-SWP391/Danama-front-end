import "./film-list-page.css";
import Header from "../../components/common/Header/Header.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import SeparateLine from "../../components/common/SeparateLine/SeparateLine.jsx";
import FilterOption from "../../components/container/film-list-page/FilterOption/FilterOption.jsx";
import ListFilms from "../../components/container/film-list-page/ListFilms/ListFilms.jsx";
import {useContext, useEffect, useState} from "react";
import {WebContext} from "../../utils/webContext.jsx";
import useDebounce from "../../utils/utility.js";

function FilmListPage() {
    const { filmList } = useContext(WebContext);
    const [filteredFilms, setFilteredFilms] = useState(filmList);

    // Individual filter states
    const [genre, setGenre] = useState("");
    const [country, setCountry] = useState("");
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");

    // Debounced search to reduce re-renders during typing
    const debouncedSearch = useDebounce(search, 300);

    // Unique genres and countries for filter options
    const genres = Array.from(new Set(filmList.flatMap(film => film.genres.map(genre => genre.name))));
    const countries = Array.from(
        new Set(filmList.map(film => film.country).filter(Boolean))
    ).map((country, index) => ({
        id: index + 1,
        name: country
    }));

    // Apply filters whenever filter states change
    useEffect(() => {
        let filtered = filmList;

        if (genre) {
            filtered = filtered.filter(film =>
                film.genres.some(g => g.name === genre)
            );
        }
        if (country) {
            filtered = filtered.filter(film => film.country === country);
        }
        if (status) {
            const statusMapping = {
                "Now playing": 1,
                "Coming soon": 2,
                "Inactive": 0
            };
            const statusValue = statusMapping[status];
            if (statusValue !== undefined) {
                filtered = filtered.filter(film => film.status === statusValue);
            }
        }
        if (debouncedSearch) {
            filtered = filtered.filter(film =>
                film.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        setFilteredFilms(filtered);
    }, [genre, country, status, debouncedSearch, filmList]);

    return (
        <div className="list-film">
            <Header />
            <FilterOption
                genre={genre}
                setGenre={setGenre}
                country={country}
                setCountry={setCountry}
                status={status}
                setStatus={setStatus}
                search={search}
                setSearch={setSearch}
                genres={genres}
                countries={countries}
            />
            <SeparateLine />
            <ListFilms filteredFilms={filteredFilms} />
            <SeparateLine />
            <Footer />
        </div>
    );
}

export default FilmListPage;
