import './SignUpBtn.css';

import Button from "../../../common/Button/Button.jsx";

// eslint-disable-next-line react/prop-types
function SignUpBtn({ onClick }) {
    return (
        <Button className="signup-btn" onClick={onClick} >Sign Up</Button>
    );
}

export default SignUpBtn;