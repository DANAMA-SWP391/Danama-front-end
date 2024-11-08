import "./login.css";
import { useEffect, useState, useContext } from "react";
import { validateEmailAndPassword } from "../../utils/validateHelper.js";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/common/Logo/Logo.jsx";
import Slogan from "../../components/common/Slogan/Slogan.jsx";
import LoginBox from "../../components/container/login/LoginBox/LoginBox.jsx";
import Others from "../../components/container/login/Others/Others.jsx";
import ErrMsgBox from "../../components/common/ErrMsgBox/ErrMsgBox.jsx";
import { UserContext } from "../../utils/userContext.jsx";
import {login, logoutUser} from "../../api/authAPI.js";
import {useCustomAlert} from "../../utils/CustomAlertContext.jsx";

function Login() {
    const showAlert = useCustomAlert();
    const {setUser } = useContext(UserContext);
    const navigate = useNavigate();

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

        setTimeout(async () => {
            if (!validateEmailAndPassword(email, password)) {
                setContent("Invalid email or password!");
                setIsSuccess(false);
                setLoading(false);
                return;
            }

            try {
                const response = await login(email, password); // Use the login function

                if (response.success) {
                    if (response.user.roleId !== 0) {
                        setUser(response.user);
                    }
                    handleLoginSuccess(response.user); // Call your success handler
                } else {
                    handleLoginFailed(); // Call your failure handler
                    setContent(response.message || "Login failed!"); // Optionally set an error message
                }
            } catch (error) {
                console.error('Login error:', error); // Log the error
                setContent("An error occurred during login.");
                setIsSuccess(false);
            } finally {
                setLoading(false); // Ensure loading is set to false at the end
            }
        }, 500); // Delay of 500ms
    };

    const handleLoginFailed = () => {
        setContent("Email or password is incorrect!");
        setIsSuccess(false);
    };

    const handleLoginSuccess = (user) => {
        setIsSuccess(true);
        if(user.roleId === 2) {
            showAlert("Welcome " + user.name);
            navigate("/Cmanager");
        }
        else if(user.roleId === 1) {
            showAlert("Welcome admin!");
            navigate("/admin-dashboard");
        }
        else if(user.roleId === 0) {
            showAlert("Your account has been banned!!");
            navigate("/");
        }
        else {
            showAlert("Welcome to DANAMA!");
            navigate("/");
        }
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