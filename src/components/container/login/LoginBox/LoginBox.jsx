import { useRef } from 'react';
import './LoginBox.css';

import ResetPassLink from "../ResetPassLink/ResetPassLink.jsx";
import RememberMe from "../RememberMe/RememberMe.jsx";
import LoginBtn from "../LoginBtn/LoginBtn.jsx";
import InputBox from "../../../common/InputBox/InputBox.jsx";

// eslint-disable-next-line react/prop-types
function LoginBox({ handleButtonClick, isSuccess, loading }) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onClick = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        handleButtonClick(email, password);
    };

    return (
        <form>
            {loading ? (
                <>
                    <InputBox ref={emailRef} className={`email-input ${isSuccess ? `` : `err`}`} type="email" placeholder="Email" />
                    <ResetPassLink />
                    <InputBox ref={passwordRef} className={`password-input ${isSuccess ? `` : `err`}`} type="password" placeholder="Password" />
                    <RememberMe />
                    <LoginBtn onClick={onClick} />
                </>
            ) : (
                <>
                    <InputBox ref={emailRef} className={`email-input ${isSuccess ? `` : `err`}`} type="email" placeholder="Email" />
                    <ResetPassLink />
                    <InputBox ref={passwordRef} className={`password-input ${isSuccess ? `` : `err`}`} type="password" placeholder="Password" />
                    <RememberMe />
                    <LoginBtn onClick={onClick} />
                </>
            )}
        </form>
    );
}

export default LoginBox;