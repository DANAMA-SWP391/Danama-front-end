import "./FilterOption.css";
import PropTypes from "prop-types";

function FilterOption({ genre, setGenre, country, setCountry, status, setStatus, search, setSearch, genres, countries }) {
    return (
        <div className="filter-option">
            {/* Genre Filter */}
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">All Genres</option>
                {genres.map((genre, index) => (
                    <option key={index} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>

            {/* Country Filter */}
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">All Countries</option>
                {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                        {country.name}
                    </option>
                ))}
            </select>

            {/* Status Filter */}
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="Now playing">Now Playing</option>
                <option value="Coming soon">Coming Soon</option>
            </select>

            {/* Search Filter */}
            <input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

FilterOption.propTypes = {
    genre: PropTypes.string.isRequired,
    setGenre: PropTypes.func.isRequired,
    country: PropTypes.string.isRequired,
    setCountry: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    setStatus: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    countries: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired
};

export default FilterOption;
