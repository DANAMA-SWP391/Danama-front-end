import './LoginBox.css';

import InputBox from "../../../Common/InputBox/InputBox.jsx";
import LoginBtn from "../LoginBtn/LoginBtn.jsx";
import RemeberMe from "../RememberMeCheckBox/RemeberMe.jsx";
import ResetPassLink from "../ResetPassLink/ResetPassLink.jsx";

function LoginBox() {
    return (
            <form>
                <InputBox className="email-input" type="email" placeholder="Email"/>
                <ResetPassLink/>
                <InputBox className="password-input" type="password" placeholder="Password"/>
                <RemeberMe/>
                <LoginBtn/>
            </form>
    )
}

export default LoginBox;