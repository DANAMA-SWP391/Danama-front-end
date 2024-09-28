import "./login.css";

import Logo from "../../components/common/Logo/Logo.jsx";
import Slogan from "../../components/common/Slogan/Slogan.jsx";
import LoginBox from "../../components/container/login/LoginBox/LoginBox.jsx";
import Others from "../../components/container/login/Others/Others.jsx";

function Login() {
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
                <Others />
            </div>
        </div>
    );
}

export default Login;