import './sign-up.css';

import Logo from "../../components/common/Logo/Logo.jsx";
import Slogan from "../../components/common/Slogan/Slogan.jsx";
import SignupBox from "../../components/container/sign-up/SignUpBox/SignUpBox.jsx";

function SignUp() {

    const handleButtonClick = (name, email, phone, pass, confirmPass) => {
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Password:", pass);
        console.log("Confirm Password:", confirmPass);
    }

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
                <SignupBox handleButtonClick={handleButtonClick} />
            </div>
        </div>
    )
}

export default SignUp;
