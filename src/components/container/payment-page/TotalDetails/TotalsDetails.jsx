import PropTypes from "prop-types";
import "./TotalDetails.css";


function TotalDetails({ totalPrice }) {
    return (
        <div className="total-details">
            <p>Total Price: {totalPrice.toLocaleString('vi-VN')}đ</p>
        </div>
    );
}
TotalDetails.propTypes = {
    totalPrice: PropTypes.number.isRequired,
};
export default TotalDetails;