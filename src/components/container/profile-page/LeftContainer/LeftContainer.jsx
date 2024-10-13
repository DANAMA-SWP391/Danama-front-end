import "./LeftContainer.css";
import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import Options from "../Options/Options.jsx";

function LeftContainer() {
    return (
        <div className="body__left-container">
            <UserAvatar/>
            <Options/>
        </div>
    )
}

export default LeftContainer;