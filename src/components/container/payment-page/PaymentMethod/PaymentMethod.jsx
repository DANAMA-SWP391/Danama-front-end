import { useState } from "react";
import PropTypes from 'prop-types';
import Button from "../../../common/Button/Button.jsx";
import "./PaymentMethod.css"; // Assuming there's a PaymentMethod.css file for styling

function PaymentMethod({ setMethod }) {
    const [selectedMethod, setSelectedMethod] = useState('');

    const handleMethodClick = (method) => {
        setSelectedMethod(method);
        setMethod(method); // Pass the selected method back to the parent component
    };

    return (
        <div className="payment-methods">
            <h2>Which Payment do you like?</h2>
            {/* Using Button component for payment options */}
            <Button
                onClick={() => handleMethodClick('MoMo')}
                className={selectedMethod === 'MoMo' ? 'selected' : ''}
            >
                MoMo e-wallet
            </Button>
            <Button
                onClick={() => handleMethodClick('VNPay')}
                className={selectedMethod === 'VNPay' ? 'selected' : ''}
            >
                VNPAY
            </Button>
        </div>
    );
}

PaymentMethod.propTypes = {
    setMethod: PropTypes.func.isRequired, // Set the payment method in the parent component
};

export default PaymentMethod;
