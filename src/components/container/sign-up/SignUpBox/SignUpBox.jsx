import '../SignUpBox/SignUpBox.css';

import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import InputBox from "../../../common/InputBox/InputBox.jsx";

function SignupBox() {
    return (
        <div className="form-container">
            <form>
                <InputBox className="name" type="text" placeholder="Name"/>
                <InputBox className="email" type="email" placeholder="Email"/>
                <InputBox className="phone" type="text" placeholder="Phone Number"/>
                <InputBox className="password" type="password" placeholder="Password"/>
                <InputBox className="password" type="password" placeholder="Confirm Password"/>
                <div className="terms">
                    <span>By clicking sign up, you agree to our <a href="">Terms</a></span>
                </div>
                <div className="signup-btn">
                    <SignUpBtn/>
                </div>
            </form>
        </div>
    );
}

export default SignupBox;