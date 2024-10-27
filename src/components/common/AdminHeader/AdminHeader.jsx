import "./AdminHeader.css";
import MainPageLogo from "../../container/main-page/MainPageLogo/MainPageLogo.jsx";
import LoginBtn from "../../container/main-page/LoginBtn/LoginBtn.jsx";
import PropTypes from 'prop-types';
import HeaderUser from "../HeaderUser/HeaderUser.jsx";
import { useContext } from "react";
import { UserContext } from "../../../utils/userContext.jsx";

function AdminHeader() {
    const { user } = useContext(UserContext);

    return (
        <div className="admin-header">
            <div className="container">
                <MainPageLogo />
                <h2 className="admin-title">ADMIN PAGE</h2>
                {
                    user ?
                        <HeaderUser user={user} /> : <LoginBtn to={"/login"} />
                }
            </div>
        </div>
    );
}

AdminHeader.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

export default AdminHeader;
