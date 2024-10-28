import "./email-verification-page.css";
import {useLocation, useNavigate} from "react-router-dom";
import {register, sendVerificationCode} from "../../api/authAPI.js";
import {useEffect, useRef, useState} from "react";
import Logo from "../../components/common/Logo/Logo.jsx";
import {useCustomAlert} from "../../utils/CustomAlertContext.jsx";

function EmailVerification() {
    const showAlert = useCustomAlert();
    const location = useLocation();
    const [verifyCode, setVerifyCode]= useState('');
    const { user } = location.state || {};
    const [code, setCode] = useState('');
    const fetchCalled = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!fetchCalled.current) {
            sendCode(user.email);
            fetchCalled.current = true;
        }
    }, [user]);

    const sendCode = async (email) => {
        try {
            const data = await sendVerificationCode(email);
            setVerifyCode(data.code); // Assuming the response contains a code
            showAlert('Verification code sent to your email.');
        } catch (error) {
            console.error('Error sending verification code:', error);
            showAlert('Failed to send verification code.');
        }
    };

    const handleClick = () => {
        if (code === verifyCode) {
            register(user)
                .then(() => {
                    showAlert("Registration successful!");
                    navigate('/login');
                })
                .catch((error) => {
                    console.error("Registration failed:", error);
                    showAlert("Registration failed. Please try again.");
                });
        } else {
            showAlert('Verification failed. Please check the code and try again.');
        }
    };

    const handleResendCode = async () => {
        await sendCode(user.email);
    };

    return (
        <div className="email-verification-page">
            <div className="email-verification-box">
                <div className='logo-in-email'><Logo/></div>
                <h1>Email Verification</h1>
                <p>
                    Please check your email for the verification code. Enter the code
                    below to verify your account.
                </p>
                <input
                    type="text"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    // Update code state on input change
                />
                <div>
                    <button onClick={handleClick}>Verify</button>
                    <button onClick={handleResendCode}>Resend Code</button>
                </div>
            </div>
        </div>
    );
}

export default EmailVerification;