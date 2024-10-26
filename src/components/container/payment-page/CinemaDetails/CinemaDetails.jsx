import  "./CinemaDetails.css";
import PropTypes from "prop-types";
function CinemaDetails({ cinema }) {
    return (
        <div className="cinema-details">
            <p>Cinema: {cinema.name}</p>
            <p>Address: {cinema.address}</p>
        </div>
    );
}
CinemaDetails.propTypes = {
    cinema: PropTypes.shape({
        cinemaId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
};
export default CinemaDetails;