import './sign-up.css';

import Logo from "../../components/common/Logo/Logo.jsx";
import Slogan from "../../components/common/Slogan/Slogan.jsx";
import SignupBox from "../../components/container/sign-up/SignUpBox/SignUpBox.jsx";

function SignUp() {
    return (
        <div className="signup-box">
            <div className="upper-container">
                <div className="logo-container">
                    <Logo/>
                </div>
                <div className="slogan-container">
                    <Slogan/>
                </div>
            </div>
            <div className="down-container">
                <p>Assign New Account</p>
                <SignupBox />
            </div>
        </div>
    )
}

export default SignUp;
