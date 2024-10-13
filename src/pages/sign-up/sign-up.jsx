import './sign-up.css';
import { useEffect, useState } from "react";
import Logo from "../../components/common/Logo/Logo.jsx";
import Slogan from "../../components/common/Slogan/Slogan.jsx";
import SignupBox from "../../components/container/sign-up/SignUpBox/SignUpBox.jsx";
import { validateEmail, validateName, validatePhone, validatePassword, validateConfirmPassword } from "../../utils/validateHelper";
import {addUser, users} from "../../utils/userData.js";
import defaultAvatar from "../../assets/avatars/default-avatar.svg";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [content, setContent] = useState('Assign New Account');
    const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();

    const handleButtonClick = (name, email, phone, pass, confirmPass) => {
        let error = false;
        if (!validateName(name)) {
            setContent("Name must be at least 3 characters long.");
            error = true;
        } else if (!validateEmail(email)) {
            setContent("Invalid email address.");
            error = true;
        } else if (!validatePhone(phone)) {
            setContent("Invalid phone number.");
            error = true;
        } else if (!validatePassword(pass)) {
            setContent("Password must be at least 6 characters long.");
            error = true;
        } else if (!validateConfirmPassword(pass, confirmPass)) {
            setContent("Passwords do not match.");
            error = true;
        } else {
            const user = {
                id: users.length + 1,
                email: email,
                password: password,
                name: name,
                phone: phone,
                avatar: defaultAvatar
            }
            setHasError(false);
            addUser(user);
            navigate('/login');
        }
        setHasError(error);
    }

    useEffect(() => {
        setContent('Assign New Account');
        setHasError(false);
    }, [name, email, phone, password, confirmPassword]);

    return (
        <div className="container">
            <div className="signup-box">
                <div className="upper-container">
                    <div className="logo-container"><Logo/></div>
                    <div className="slogan-container"><Slogan/></div>
                </div>
                <div className="down-container">
                    <p className={hasError ? 'err' : ''}>{content}</p>
                    <SignupBox
                        setName={setName}
                        setEmail={setEmail}
                        setPhone={setPhone}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        handleButtonClick={handleButtonClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignUp;