import './LoginBox.css';

import InputBox from "../../../Common/InputBox/InputBox.jsx";
import ResetPassLink from "../ResetPassLink/ResetPassLink.jsx";
import RememberMe from "../RememberMe/RememberMe.jsx";
import LoginBtn from "../LoginBtn/LoginBtn.jsx";

function LoginBox() {
    return (
        <form>
            <InputBox className="email-input" type="email" placeholder="Email"/>
            <ResetPassLink/>
            <InputBox className="password-input" type="password" placeholder="Password"/>
            <RememberMe/>
            <LoginBtn/>
        </form>
    )
}

export default LoginBox;