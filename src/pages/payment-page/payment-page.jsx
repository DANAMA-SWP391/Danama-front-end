import "./payment-page.css";
import SeparateLine from "../../components/common/SeparateLine/SeparateLine.jsx";
import PaymentMethod from "../../components/container/payment-page/PaymentMethod/PaymentMethod.jsx";
import BookingDetails from "../../components/container/payment-page/BookingDetails/BookingDetails.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import Header from "../../components/common/Header/Header.jsx";
import {useLocation} from "react-router-dom";
import {useState} from "react";

function Payment() {
    const location = useLocation();
    const { bookingId, bookingData } = location.state || {}; // Destructure the state
    console.log(bookingData);
    const [method, setMethod] = useState(''); // Manage selected payment method here

    return (
        <div className="payment-page">
            <Header />
            <div className="payment-page__body">
                <h1>Payment</h1>
                <SeparateLine />
                <PaymentMethod setMethod={setMethod} />
                <SeparateLine />
                <BookingDetails bookingData={bookingData} paymentMethod={method} bookingId={bookingId} />
            </div>
            <Footer />
        </div>
    );
}

export default Payment;