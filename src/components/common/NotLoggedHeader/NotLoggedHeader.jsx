import "./NotLoggedHeader.css";
import MainPageLogo from "../../container/main-page/MainPageLogo/MainPageLogo.jsx";
import OptionList from "../../container/main-page/OptionList/OptionList.jsx";
import LoginBtn from "../../container/main-page/LoginBtn/LoginBtn.jsx";

function NotLoggedHeader() {
    return (
        <div className="header">
            <div className="container">
                <MainPageLogo/>
                <OptionList/>
                <LoginBtn/>
            </div>
        </div>
    )
}

export default NotLoggedHeader;