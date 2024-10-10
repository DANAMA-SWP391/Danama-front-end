import "./PaymentMethod.css";
import Button from "../../../common/Button/Button.jsx";

function PaymentMethod() {
    return (
        <div className="body__payment-method">
            <h2>Which Payment do you like to?</h2>
            <ul>
                <li><Button>MoMo e-wallet</Button></li>
                <li><Button>QR-VNPAY</Button></li>
                <li><Button>ATM</Button></li>
            </ul>
        </div>
    );
}

export default PaymentMethod;