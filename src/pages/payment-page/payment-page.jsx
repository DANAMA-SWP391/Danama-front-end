import "./payment-page.css";
import NotLoggedHeader from "../../components/common/NotLoggedHeader/NotLoggedHeader.jsx";
import SeparateLine from "../../components/common/SeparateLine/SeparateLine.jsx";
import Button from "../../components/common/Button/Button.jsx";
import PaymentMethod from "../../components/container/payment-page/PaymentMethod/PaymentMethod.jsx";
import BookingDetails from "../../components/container/payment-page/BookingDetails/BookingDetails.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";

function Payment() {
    return (
        <div className="payment-page">
            <NotLoggedHeader />
            <div className="payment-page__body">
                <h1>Payment</h1>
                <SeparateLine />
                <PaymentMethod />
                <SeparateLine />
                <BookingDetails />
            </div>
            <Footer />
        </div>
    );
}

export default Payment;