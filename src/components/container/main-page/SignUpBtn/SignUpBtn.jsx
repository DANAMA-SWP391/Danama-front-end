import './SignUpBtn.css';
import Button from "../../../common/Button/Button.jsx";

// eslint-disable-next-line react/prop-types
function SignUpBtn( {onClick} ) {
    return (
        <Button onClick ={onClick} className="sign-up-btn">Sign Up</Button>
    )
}

export default SignUpBtn;