import "./email-verification-page.css";
import {useLocation, useNavigate} from "react-router-dom";
import {register, sendVerificationCode} from "../../api/authAPI.js";
import {useEffect, useState} from "react";

function EmailVerification() {
    const location = useLocation();
    const [verifyCode, setVerifyCode]= useState('');
    const { user } = location.state || {};
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.email) {
            sendCode(user.email); // Call sendCode to send the verification code when the component mounts
        }
    }, [user]);

    const sendCode = async (email) => {
        try {
            const data = await sendVerificationCode(email);
            setVerifyCode(data.code); // Assuming the response contains a code
            alert('Verification code sent to your email.');
        } catch (error) {
            console.error('Error sending verification code:', error);
            alert('Failed to send verification code.');
        }
    };

    const handleClick = () => {
        if (code === verifyCode) {
            register(user)
                .then(() => {
                    alert("Registration successful!");
                    navigate('/login');
                })
                .catch((error) => {
                    console.error("Registration failed:", error);
                    alert("Registration failed. Please try again.");
                });
        } else {
            alert('Verification failed. Please check the code and try again.');
        }
    };

    const handleResendCode = async () => {
        await sendCode(user.email);
    };

    return (
        <div className="email-verification-page">
            <div className="email-verification-box">
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
                <button onClick={handleClick}>Verify</button>
                <button onClick={handleResendCode}>Resend Code</button> {/* Resend Code Button */}
            </div>
        </div>
    );
}

export default EmailVerification;