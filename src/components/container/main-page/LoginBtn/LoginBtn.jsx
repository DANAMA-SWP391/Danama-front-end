import "./LoginBtn.css";

import Button from "../../../common/Button/Button.jsx";

// eslint-disable-next-line react/prop-types
function LoginBtn({ onClick }) {
    return (
        <Button onClick={onClick} className={"sign-in-btn"}>Sign In</Button>
    )
}

export default LoginBtn;