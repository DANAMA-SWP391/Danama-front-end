import "./LeftContainer.css";
import { useContext } from "react";
import { UserContext } from "../../../../utils/userContext.jsx";
import avatar from '../../../../assets/Icons/avatar.svg';
import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import Options from "../Options/Options.jsx";
import PropTypes from 'prop-types';

function LeftContainer({ onOptionSelect }) {
    const { user } = useContext(UserContext); // Get user from context
    if (!user) return null; // Handle case where user is null or undefined

    return (
        <div className="body__left-container">
            <UserAvatar name={user.name} avatar={user.avatar ? user.avatar : avatar}  />
            <Options onOptionSelect={onOptionSelect} />
        </div>
    );
}

LeftContainer.propTypes = {
    onOptionSelect: PropTypes.func.isRequired, // Function to handle option selection
};

export default LeftContainer;
