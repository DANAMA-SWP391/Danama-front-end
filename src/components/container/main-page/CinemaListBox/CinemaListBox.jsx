import PropTypes from 'prop-types';

const CinemaListBox = ({ cinemas, selectedCinema, showtimeList, handleCinemaClick, getPriceRangeForCinema }) => {
    return (
        <div className="cinema-list-box">
            {cinemas.map((cinema, index) => {
                const priceRange = getPriceRangeForCinema(cinema.cinemaId, showtimeList); // Calculate price range
                const isSelected = selectedCinema?.cinemaId === cinema.cinemaId; // Check if this cinema is selected
                return (
                    <div
                        className={`cinema ${isSelected ? 'selected' : ''}`}
                        key={index}
                        onClick={() => handleCinemaClick(cinema)}
                    >
                        <p className="name">{cinema.name}</p>
                        {priceRange ? (
                            <p className="price-range">
                                {priceRange.minPrice === priceRange.maxPrice
                                    ? `Price: ${priceRange.minPrice}đ`
                                    : `Price range: ${priceRange.minPrice}đ - ${priceRange.maxPrice}đ`}
                            </p>
                        ) : (
                            <p className="price-range">No showtimes available</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

CinemaListBox.propTypes = {
    cinemas: PropTypes.array.isRequired,
    selectedCinema: PropTypes.object,
    showtimeList: PropTypes.array.isRequired,
    handleCinemaClick: PropTypes.func.isRequired,
    getPriceRangeForCinema: PropTypes.func.isRequired,
};

export default CinemaListBox;
