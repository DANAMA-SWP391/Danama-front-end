import './reset-pass.css';
import Logo from "../../components/common/Logo/Logo.jsx";
import SendBtn from "../../components/container/reset-pass/SendBtn/SendBtn.jsx";
import { useEffect, useRef, useState } from "react";
import InputBox from "../../components/common/InputBox/InputBox.jsx";
import { validateEmail } from "../../utils/validateHelper.js";
import {fetchListEmails, resetPassword, sendVerificationCode} from "../../api/authAPI.js";
import {useNavigate} from "react-router-dom";
import {useCustomAlert} from "../../utils/CustomAlertContext.jsx";

function ResetPass() {
    const showAlert = useCustomAlert();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const codeRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState({
        email: "",
        isSuccess: false,
        loading: false,
        content: "Enter your Email",
        active: false,
        err: false,
        password: "",
        confirmPassword: "",
        verificationCode: ""  // State to store the verification code from the backend
    });

    const updateFormState = (newState) => {
        setFormState(prevState => ({ ...prevState, ...newState }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormState({ [name]: value });
    };

    const resetFields = (fields) => {
        fields.forEach(field => {
            if (field.current) field.current.value = "";
        });
    };

    const handleEmailSubmission = async () => {
        try {
            setEmail(emailRef.current.value);
            if (!validateEmail(emailRef.current.value)) {
                updateFormState({ err: true, content: "Invalid email" });
                return;
            }

            // Fetch list of emails and check if the email exists
            const data = await fetchListEmails();
            const emailList = data.listEmails;
            if (!emailList.includes(emailRef.current.value)) {
                updateFormState({ err: true, content: "Email does not exist" });
                return;
            }

            // Send verification code and store the verification code from the response
            const response = await sendVerificationCode(emailRef.current.value);
            const verificationCode = response.code;  // Save the verification code from the API response

            // Update form state with the verification code and prepare the UI for the next step
            updateFormState({
                content: "Please check your email to get the code",
                active: true,
                verificationCode: verificationCode // Store verification code in state
            });

            resetFields([emailRef]);
        } catch (error) {
            updateFormState({ err: true, content: "Error sending verification code" });
            console.error(error);
        }
    };

    const handleCodeSubmission = () => {
        if (codeRef.current.value !== formState.verificationCode) {
            updateFormState({ err: true, content: "Code is incorrect" });
        } else {
            updateFormState({ content: "Enter your new password", isSuccess: true });
            resetFields([codeRef]);
        }
    };

    const handlePasswordSubmission = async () => {
        if (passwordRef.current.value !== confirmRef.current.value) {
            updateFormState({ err: true, content: "Passwords do not match" });
            return;
        }

        try {
            // Reset password via API
            await resetPassword(email, passwordRef.current.value);
            updateFormState({ content: "Password reset successful", isSuccess: false, active: false });
            resetFields([passwordRef, confirmRef]);
            navigate('/');
            showAlert('Reset password successfully!!');
        } catch (error) {
            updateFormState({ err: true, content: "Error resetting password" });
            console.error(error);
        }
    };

    const handleClick = () => {
        updateFormState({ loading: true });

        setTimeout(() => {
            if (!formState.active) {
                handleEmailSubmission();
            } else if (!formState.isSuccess) {
                handleCodeSubmission();
            } else {
                handlePasswordSubmission();
            }
            updateFormState({ loading: false });
        }, 1000);
    };

    useEffect(() => {
        if (formState.email) {
            updateFormState({ content: "Enter your Email", err: false });
        }
    }, [formState.email]);

    return (
        <div className="container">
            <div className="reset-pass-container">
                <div className="upper-container">
                    <Logo className="reset-logo" />
                    <p>Reset Password</p>
                </div>
                <div className="lower-container">
                    <p style={{ color: formState.err ? 'red' : 'green' }}>{formState.content}</p>
                    <form>
                        <InputBox
                            ref={emailRef}
                            name="email"
                            className={`email-input ${formState.active ? '' : 'active'}`}
                            type="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                        />
                        <InputBox
                            ref={codeRef}
                            name="code"
                            className={`code-input ${formState.active && !formState.isSuccess ? 'active' : ''}`}
                            type="text"
                            placeholder="Code"
                        />
                        <InputBox
                            ref={passwordRef}
                            name="password"
                            className={`pass-input ${formState.isSuccess ? 'active' : ''}`}
                            type="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                        />
                        <InputBox
                            ref={confirmRef}
                            name="confirmPassword"
                            className={`confirm-input ${formState.isSuccess ? 'active' : ''}`}
                            type="password"
                            placeholder="Confirm Password"
                            onChange={handleInputChange}
                        />
                        <SendBtn onClick={handleClick} />
                        {formState.loading && (
                            <div className="loading-screen">
                                <div className="spinner"></div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPass;