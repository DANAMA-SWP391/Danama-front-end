import "./login.css";
import { useEffect, useState, useContext } from "react";
import { validateEmailAndPassword } from "../../utils/validateHelper.js";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/common/Logo/Logo.jsx";
import Slogan from "../../components/common/Slogan/Slogan.jsx";
import LoginBox from "../../components/container/login/LoginBox/LoginBox.jsx";
import Others from "../../components/container/login/Others/Others.jsx";
import ErrMsgBox from "../../components/common/ErrMsgBox/ErrMsgBox.jsx";
import Avatar from '../../assets/avatars/cat.png';
import { UserContext } from "../../utils/userContext.jsx";

function Login() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const user = {
        id: '1',
        email: 'tungdang.nbk.9a5@gmail.com',
        password: '555555',
        name: 'Tung Dang',
        phone: '0987654321',
        avatar: Avatar
    };

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
        setTimeout(() => {
            if (!validateEmailAndPassword(email, password)) {
                setContent("Invalid email or password!");
                setIsSuccess(false);
            } else if (email !== user.email || password !== user.password) {
                handleLoginFailed();
            } else {
                handleLoginSuccess()
            }
            setLoading(false);
        }, 500);
    };

    const handleLoginFailed = () => {
        setContent("Email or password is incorrect!");
        setIsSuccess(false);
    };

    const handleLoginSuccess = () => {
        setIsSuccess(true);
        setUser(user);
        navigate("/");
    };

    return (
        <>
            {loading && <div className="loading-screen"><div className="spinner"></div></div>}
            <div className="login-container">
                <div className="left-container">
                    <div className="logo-container"><Logo /></div>
                    <p className="slogan-container"><Slogan /></p>
                </div>
                <div className="right-container">
                    <div className="login-form">
                        <ErrMsgBox isSuccess={isSuccess}>{content}</ErrMsgBox>
                        <LoginBox
                            isSuccess={isSuccess}
                            handleButtonClick={handleButtonClick}
                            loading={loading}
                            setEmail={setEmail}
                            setPassword={setPassword}
                        />
                    </div>
                    <Others />
                </div>
            </div>
        </>
    );
}

export default Login;