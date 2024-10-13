import "./LoginBtn.css";

import Button from "../../../common/Button/Button.jsx";

// eslint-disable-next-line react/prop-types
function LoginBtn({ onClick, to }) {
    return (
        <Button onClick={onClick} className={"sign-in-btn"} to={to}>Sign In</Button>
    )
}

export default LoginBtn;