import { useState } from "react";
import "./ChangePass.css";
import InputBox from "../../../common/InputBox/InputBox.jsx";
import PropTypes from "prop-types";

function ChangePass({ onChangePassword, hasPassword }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onChangePassword(oldPassword, newPassword, confirmPassword);
        resetForm();
    };

    const resetForm = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className="change-pass-container">
            {hasPassword && (
                <InputBox
                    title="Old Password"
                    type="password"
                    placeholder="Enter Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            )}
            <InputBox
                title="New Password"
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputBox
                title="Confirm New Password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="btn">Change Password</button>
        </form>
    );
}

ChangePass.propTypes = {
    onChangePassword: PropTypes.func.isRequired, // Ensure onChangePassword is a function
    hasPassword: PropTypes.bool.isRequired,      // Ensure hasPassword is a boolean
};

export default ChangePass;

