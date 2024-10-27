import './RightContainer.css';
import UserInfos from '../UserInfos/UserInfos';
import person from '../../../../assets/Icons/person.svg';
import mail from '../../../../assets/Icons/mail.svg';
import phone from '../../../../assets/Icons/phone.svg';
import avatar from '../../../../assets/Icons/avatar.svg';
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {changePassword, checkIfHasPassword, fetchJwtToken, resetPassword} from "../../../../api/authAPI.js";
import {fetchBookingHistory, updateProfile} from "../../../../api/userAPI.js";
import BookingHistory from "../BookingHistory/Booking History.jsx";
import ChangePass from "../ChangePass/ChangePass.jsx";
import {useNavigate} from "react-router-dom";
import {useCustomAlert} from "../../../../utils/CustomAlertContext.jsx";

function RightContainer({ selectedOption }) {
    const showAlert= useCustomAlert();
    const [user, setUser] = useState(null);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCalled = useRef(false);
    const [message, setMessage] = useState('');
    const navigate= useNavigate();
    const [hasPassword, setHasPassword] = useState(false);
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetchJwtToken();
            if (response.success) {
                setUser(response.user);

                // Check if the user has a password
                const hasPasswordResult = await checkIfHasPassword(response.user.UID);
                setHasPassword(hasPasswordResult);
            } else {
                showAlert("Your session is expired, login again!");
                navigate('/login');
            }
        };

        if (!fetchCalled.current) {
            fetchUserData();
            fetchCalled.current = true;
        }
        setMessage('');
        setLoading(false);
    }, []);

    // Fetch booking history if user and selected option is "Booking History"
    useEffect(() => {
        const handleBookingHistory = async () => {
            if (user && selectedOption === 'Booking History') {
                setLoading(true);
                try {
                    const historyData = await fetchBookingHistory(user.UID); // Use uid from user
                    setBookingHistory(historyData.bookings);
                    console.log(historyData);
                } catch (error) {
                    setError('Error fetching booking history');
                }
                setLoading(false);
            }
        };

        handleBookingHistory();
    }, [user, selectedOption]);

    const createInfos = () => {
        if (!user) return [];
        return [
            { title: "Name", content: user.name || "N/A", img: person },
            { title: "Email", content: user.email || "N/A", img: mail },
            { title: "Phone", content: user.phone || "N/A", img: phone },
            { title: "Avatar", content: '', img: user.avatar || avatar },
        ];
    };
    const handleChangePassword = async (oldPassword, newPassword, confirmPassword) => {
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match.");
            return;
        }
        try {
            let response;
            if (hasPassword) {
                response = await changePassword(user.email, oldPassword, newPassword);
            } else {
                response = await resetPassword(user.email, newPassword);
            }

            if (response.success) {
                showAlert("Password updated successfully!");
                window.location.reload();
            } else {
                setMessage(response.message || "Failed to update password.");
            }
        } catch (error) {
            setMessage("An error occurred while updating the password.");
        }
    };
    const handleProfileUpdate = async (updatedInfo) => {
        // Update the user profile with the new information
        const updatedUser = { ...user };

        if (updatedInfo.title === "Name") {
            updatedUser.name = updatedInfo.content;
        } else if (updatedInfo.title === "Phone") {
            updatedUser.phone = updatedInfo.content;
        } else if (updatedInfo.title === "Avatar") {
            updatedUser.avatar = updatedInfo.content;
        }
        console.log(updatedUser);
        // Call the updateProfile API
        try {
            const response = await updateProfile(updatedUser);
            if (response.sucess) {
                setUser(updatedUser); // Update the user in state

                const userFromStorage = JSON.parse(localStorage.getItem('user')); // Retrieve the existing user object
                if (userFromStorage) {
                    userFromStorage.name = updatedUser.name; // Update name
                    userFromStorage.avatar = updatedUser.avatar; // Update avatar
                    localStorage.setItem('user', JSON.stringify(userFromStorage));
                }
                window.location.reload();
            } else {
                console.error('Profile update failed:', response.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    const renderContent = () => {
        switch (selectedOption) {
            case 'User information':
                return (
                    <div>
                        <h2>User Information</h2>
                        <UserInfos infos={createInfos()} onUpdate={handleProfileUpdate}/>
                    </div>
                );
            case 'Booking History':
                return (
                    <div>
                        <h2>Booking History</h2>
                        <BookingHistory history={bookingHistory} /> {/* Pass booking history data */}
                    </div>
                );
            case 'Change Password':
                return (
                    <div>
                        <h2>Change Password</h2>
                        {message && <p className="message">{message}</p>} {/* Display success or error message */}
                        {/* Pass the handleChangePassword function to the ChangePass component */}
                        <ChangePass onChangePassword={handleChangePassword} hasPassword={hasPassword} />
                    </div>
                );
            case 'Log out':
                return <div><h2>Logging out...</h2></div>;
            default:
                return <div>Select an option from the menu</div>;
        }
    };

    if (loading) return <div className="loading-overlay">
        <div className="spinner"></div>
    </div>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="body__right-container">
            {renderContent()}
        </div>
    );
}

RightContainer.propTypes = {
    selectedOption: PropTypes.string.isRequired,
};

export default RightContainer;
