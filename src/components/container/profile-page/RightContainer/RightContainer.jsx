import './RightContainer.css';
import UserInfos from '../UserInfos/UserInfos';
import person from '../../../../assets/Icons/person.svg';
import mail from '../../../../assets/Icons/mail.svg';
import phone from '../../../../assets/Icons/phone.svg';
import avatar from '../../../../assets/Icons/avatar.svg';
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {changePassword, fetchJwtToken} from "../../../../api/authAPI.js";
import {fetchBookingHistory} from "../../../../api/userAPI.js";
import BookingHistory from "../BookingHistory/Booking History.jsx";
import ChangePass from "../ChangePass/ChangePass.jsx";

function RightContainer({ selectedOption }) {
    const [user, setUser] = useState(null);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCalled = useRef(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetchJwtToken();
            if (response.success) {
                setUser(response.user);
            } else {
                setError(response.message);
            }
            setLoading(false);
        };

        if (!fetchCalled.current) {
            fetchUserData();
            fetchCalled.current = true;
        }
        setMessage('');
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
        // Basic validation
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match.");
            return;
        }

        try {
            // Call the changePassword API
            const response = await changePassword(user.email, oldPassword, newPassword);
            if (response.success) {
                alert("Change password successfully!!");
                window.location.reload();
            } else {
                setMessage(response.message || "Failed to change password.");
            }
        } catch (error) {
            setMessage("An error occurred while changing the password.");
        }
    };

    const renderContent = () => {
        switch (selectedOption) {
            case 'User information':
                return (
                    <div>
                        <h2>User Information</h2>
                        <UserInfos infos={createInfos()} />
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
                        <ChangePass onChangePassword={handleChangePassword} />
                    </div>
                );
            case 'Log out':
                return <div><h2>Logging out...</h2></div>;
            default:
                return <div>Select an option from the menu</div>;
        }
    };

    if (loading) return <p>Loading...</p>;
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
