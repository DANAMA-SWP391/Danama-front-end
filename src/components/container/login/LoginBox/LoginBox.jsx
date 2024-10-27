import { useRef } from 'react';
import './LoginBox.css';

import ResetPassLink from "../ResetPassLink/ResetPassLink.jsx";
import LoginBtn from "../LoginBtn/LoginBtn.jsx";
import InputBox from "../../../common/InputBox/InputBox.jsx";

// eslint-disable-next-line react/prop-types
function LoginBox({ handleButtonClick, isSuccess, setEmail, setPassword }) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onClick = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        handleButtonClick(email, password);
    };

    const onEmailChange = () => {
        setEmail(emailRef.current.value);
    }

    const onPasswordChange = () => {
        setPassword(passwordRef.current.value);
    }

    return (
        <form>
                <>
                    <InputBox ref={emailRef} className={`email-input ${isSuccess ? `` : `err`} active`} type="email" placeholder="Email" onChange={onEmailChange} />
                    <ResetPassLink />
                    <InputBox ref={passwordRef} className={`password-input ${isSuccess ? `` : `err`} active`} type="password" placeholder="Password" onChange={onPasswordChange} />
                    {/*<RememberMe />*/}
                    <LoginBtn onClick={onClick} />
                </>
        </form>
    );
}

export default LoginBox;