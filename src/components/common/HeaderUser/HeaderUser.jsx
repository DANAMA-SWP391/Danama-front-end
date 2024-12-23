import { useState } from 'react';
import "./HeaderUser.css";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {logoutUser} from "../../../api/authAPI.js";

function HeaderUser({ user }) {
    const [showOptions, setShowOptions] = useState(false);
    // Function to handle log out
    const handleLogout = () => {
        logoutUser();
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setShowOptions(!showOptions); // Toggle the dropdown state
    };

    return (
        <div className="header-user">
            <div className="header-user__container">
                <Link to="/profile" className="header-user__avatar">
                    <img src={user.avatar} alt="avatar" />
                </Link>
                <div className="header-user__triangle" onClick={toggleDropdown}>
                    ▼
                </div>
            </div>

            {/* Dropdown options */}
            {showOptions && (
                <div className="header-user__dropdown">
                    <ul>
                        <li onClick={handleLogout}>Log Out</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

HeaderUser.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default HeaderUser;
