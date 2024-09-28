import './LoginBtn.css';
import Button from "../../../common/Button/Button.jsx";

// eslint-disable-next-line react/prop-types
function LoginBtn( {onClick} ) {
    return (
        <Button onClick ={onClick} className="login-btn">Login</Button>
    )
}

export default LoginBtn;