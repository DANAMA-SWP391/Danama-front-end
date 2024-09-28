import "./login.css";

import { useEffect, useState } from "react";
import { validateEmailAndPassword } from "../../utils/validateHelper.js";

import Logo from "../../components/common/Logo/Logo.jsx";
import Slogan from "../../components/common/Slogan/Slogan.jsx";
import LoginBox from "../../components/container/login/LoginBox/LoginBox.jsx";
import Others from "../../components/container/login/Others/Others.jsx";
import ErrMsgBox from "../../components/common/ErrMsgBox/ErrMsgBox.jsx";

function Login() {
    const trueEmail = 'tungdang@gmail.com';
    const truePass = '555555';

    const [isSuccess, setIsSuccess] = useState(true);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (email || password) {
            setContent("");
            setIsSuccess(true);
        }
    }, [email, password]);

    const handleButtonClick = (email, password) => {
        setLoading(true);
        console.log("Email:", email);
        console.log("Password:", password);

        setTimeout(() => {
            if (!validateEmailAndPassword(email, password)) {
                setContent("Invalid email or password!");
                setIsSuccess(false);
            } else if (email !== trueEmail || password !== truePass) {
                setContent("Email or password is incorrect!");
                setIsSuccess(false);
            } else {
                setIsSuccess(true);
            }
            setLoading(false);
        }, 500);
    };

    return (
        <>
            <div className={loading ? `loading-screen` : ''}>
                <div className={loading ? 'spinner' : ''}></div>
            </div>
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
                        <ErrMsgBox isSuccess={isSuccess}>{content}</ErrMsgBox>
                        <LoginBox isSuccess={isSuccess} handleButtonClick={handleButtonClick} loading={loading} setEmail={setEmail} setPassword={setPassword} />
                    </div>
                    <Others />
                </div>
            </div>
        </>
    );
}

export default Login;