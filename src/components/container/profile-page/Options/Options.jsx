import "./Options.css";
import PropTypes from 'prop-types';
import { useState } from 'react';
import {logoutUser} from "../../../../api/authAPI.js";

function Options({ onOptionSelect }) {
    const [activeOption, setActiveOption] = useState(null);

    // Handle logout and navigate to the home page
    const handleLogOut = () => {
        logoutUser();
    };

    const handleOptionClick = (option) => {
        setActiveOption(option); // Set the active option
        onOptionSelect(option); // Pass the selected option to parent
    };

    return (
        <div className="left-container__options">
            <ul>
                <li
                    className={activeOption === 'User information' ? 'selected' : ''}
                    onClick={() => handleOptionClick('User information')}
                >
                    User information
                </li>
                <li
                    className={activeOption === 'Booking History' ? 'selected' : ''}
                    onClick={() => handleOptionClick('Booking History')}
                >
                    Booking History
                </li>
                <li
                    className={activeOption === 'Change Password' ? 'selected' : ''}
                    onClick={() => handleOptionClick('Change Password')}
                >
                    Change Password
                </li>
                <li onClick={handleLogOut}>Log out</li> {/* Use handleLogOut for Log out */}
            </ul>
        </div>
    );
}

Options.propTypes = {
    onOptionSelect: PropTypes.func.isRequired, // Function prop for option selection
};

export default Options;
