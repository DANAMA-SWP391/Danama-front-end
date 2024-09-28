import './LoginBox.css';

import ResetPassLink from "../ResetPassLink/ResetPassLink.jsx";
import RememberMe from "../RememberMe/RememberMe.jsx";
import LoginBtn from "../LoginBtn/LoginBtn.jsx";
import InputBox from "../../../common/InputBox/InputBox.jsx";

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