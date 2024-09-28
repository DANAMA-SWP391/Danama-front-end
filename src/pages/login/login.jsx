import "./login.css";

import { useState } from "react";

import Logo from "../../components/common/Logo/Logo.jsx";
import Slogan from "../../components/common/Slogan/Slogan.jsx";
import LoginBox from "../../components/container/login/LoginBox/LoginBox.jsx";
import Others from "../../components/container/login/Others/Others.jsx";
import ErrMsgBox from "../../components/common/ErrMsgBox/ErrMsgBox.jsx";

function Login() {
    const trueEmail = 'Dang';
    const truePass = '555';

    const [isSuccess, setIsSuccess] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleButtonClick = (email, password) => {
        setLoading(true);
        console.log("Email:", email);
        console.log("Password:", password);

        setTimeout(() => {
            if (email !== trueEmail || password !== truePass) {
                setIsSuccess(false);
            } else {
                setIsSuccess(true);
            }
            setLoading(false)
        }, 1000);
    };

    return (
        <>
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
                        <ErrMsgBox isSuccess={isSuccess}>Incorrect Email or Password! Try again.</ErrMsgBox>
                        <LoginBox isSuccess={isSuccess} handleButtonClick={handleButtonClick} loading={loading} />
                    </div>
                    <Others />
                </div>
            </div>
        </>
    );
}

export default Login;