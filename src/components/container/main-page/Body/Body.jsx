import "./Body.css";
import Trailer from "../../../common/Trailer/Trailer.jsx";
import Slogan from "../../../common/Slogan 2/Slogan 2.jsx";
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";

function Body() {
    return (
        <div className="body">
            <div className="main-slide">
                <Trailer />
                <div className="option">
                    <Slogan/>
                    <div className="sign-up">
                        <span>New Guest? <SignUpBtn>Sign Up</SignUpBtn></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;