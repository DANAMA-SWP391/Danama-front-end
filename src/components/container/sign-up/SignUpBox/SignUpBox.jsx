import '../SignUpBox/SignUpBox.css';
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import InputBox from "../../../common/InputBox/InputBox.jsx";
import { useRef } from "react";
import PropTypes from 'prop-types';

function SignUpBox({ handleButtonClick, setName, setEmail, setPhone, setPassword, setConfirmPassword }) {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const onClick = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        handleButtonClick(name, email, phone, password, confirmPassword);
    }

    return (
        <div className="form-container">
            <form>
                <InputBox ref={nameRef} className="name" type="text" placeholder="Name" onChange={() => setName(nameRef.current.value)} />
                <InputBox ref={emailRef} className="email" type="email" placeholder="Email" onChange={() => setEmail(emailRef.current.value)} />
                <InputBox ref={phoneRef} className="phone" type="text" placeholder="Phone Number" onChange={() => setPhone(phoneRef.current.value)} />
                <InputBox ref={passwordRef} className="password" type="password" placeholder="Password" onChange={() => setPassword(passwordRef.current.value)} />
                <InputBox ref={confirmPasswordRef} className="password" type="password" placeholder="Confirm Password" onChange={() => setConfirmPassword(confirmPasswordRef.current.value)} />
                <div className="terms">
                    <span>By clicking sign up, you agree to our <a href="">Terms</a></span>
                </div>
                <div className="signup-btn">
                    <SignUpBtn onClick={onClick} />
                </div>
            </form>
        </div>
    );
}

SignUpBox.propTypes = {
    handleButtonClick: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPhone: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
};

export default SignUpBox;