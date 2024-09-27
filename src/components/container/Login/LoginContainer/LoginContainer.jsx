import './LoginContainer.css';

import Logo from "../../../Common/Logo/Logo.jsx";
import Slogan from "../../../Common/Slogan/Slogan.jsx";
import LoginBox from "../LoginBox/LoginBox.jsx";
import OtherContainer from "../OthersContainer/OtherContainer.jsx";

function LoginContainer() {
    return (
            <div className="login-container">
                <div className="left-container">
                    <div className="logo-container">
                        <Logo />
                    </div>
                    <p className="slogan-container">
                        <Slogan />
                    </p>
                </div>
                <div className="right-container">
                    <div className="login-form">
                        <LoginBox />
                    </div>
                    <OtherContainer />
                </div>
            </div>
    );
}

export default LoginContainer;