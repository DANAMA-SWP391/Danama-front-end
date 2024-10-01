import './reset-pass.css';
import Logo from "../../components/common/Logo/Logo.jsx";
import SendBtn from "../../components/container/reset-pass/SendBtn/SendBtn.jsx";
import { useEffect, useRef, useState } from "react";
import InputBox from "../../components/common/InputBox/InputBox.jsx";
import { validateEmail } from "../../utils/validateHelper.js";

function ResetPass() {
    const realEmail = 'tungdang@gmail.com';
    const realPass = '555555';

    const emailRef = useRef(null);
    const codeRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const [formState, setFormState] = useState({
        email: "",
        isSuccess: false,
        loading: false,
        content: "Enter your Email",
        active: false,
        err: false,
        password: "",
        confirmPassword: ""
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

    const handleEmailSubmission = () => {
        if (!validateEmail(emailRef.current.value)) {
            updateFormState({ err: true, content: "Invalid email" });
        } else if (emailRef.current.value !== realEmail) {
            updateFormState({ err: true, content: "Email does not exist" });
        } else {
            updateFormState({ content: "Please check your email to get the code", active: true });
            resetFields([emailRef]);
        }
    };

    const handleCodeSubmission = () => {
        if (codeRef.current.value !== realPass) {
            updateFormState({ err: true, content: "Code is incorrect" });
        } else {
            updateFormState({ content: "Enter your new password", isSuccess: true });
            resetFields([codeRef]);
        }
    };

    const handlePasswordSubmission = () => {
        if (passwordRef.current.value !== confirmRef.current.value) {
            updateFormState({ err: true, content: "Passwords do not match" });
        } else {
            updateFormState({ content: "Password reset successful", isSuccess: false, active: false });
            resetFields([passwordRef, confirmRef]);
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
                    <Logo className="reset-logo"/>
                    <p>Reset Password</p>
                </div>
                <div className="lower-container">
                    <p className={formState.err ? 'err' : ''}>{formState.content}</p>
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
                        <SendBtn onClick={handleClick}/>
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
