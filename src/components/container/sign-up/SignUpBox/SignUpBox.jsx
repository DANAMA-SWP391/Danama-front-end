import '../SignUpBox/SignUpBox.css';
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import InputBox from "../../../common/InputBox/InputBox.jsx";
import { useRef } from "react";

// eslint-disable-next-line react/prop-types
function SignupBox({ handleButtonClick }) {
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
                <InputBox ref={nameRef} className="name" type="text" placeholder="Name"/>
                <InputBox ref={emailRef} className="email" type="email" placeholder="Email"/>
                <InputBox ref={phoneRef} className="phone" type="text" placeholder="Phone Number"/>
                <InputBox ref={passwordRef} className="password" type="password" placeholder="Password"/>
                <InputBox ref={confirmPasswordRef} className="password" type="password" placeholder="Confirm Password"/>
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

export default SignupBox;