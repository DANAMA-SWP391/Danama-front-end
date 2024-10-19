import { useState } from 'react';
import "./HeaderUser.css";
import PropTypes from 'prop-types';
import {Link, useNavigate} from "react-router-dom";

function HeaderUser({ user }) {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();
    // Function to handle log out
    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user from localStorage
        localStorage.removeItem('jwtToken'); // Remove JWT token if applicable
        navigate('/'); // Reload the page or redirect to login page
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
