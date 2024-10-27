// CustomAlertProvider.jsx
import { createContext, useContext, useState } from 'react';
import CustomAlert from "../components/common/CustomAlert/CustomAlert.jsx";
import PropTypes from "prop-types";

// Create context
const CustomAlertContext = createContext();

export const CustomAlertProvider = ({ children }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    // Function to show alert
    const showAlert = (message) => {
        setAlertMessage(message);
        setIsVisible(true);
    };

    // Function to close alert
    const closeAlert = () => {
        setIsVisible(false);
        setAlertMessage('');
    };

    return (
        <CustomAlertContext.Provider value={showAlert}>
            {children}
            {isVisible && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </CustomAlertContext.Provider>
    );
};
CustomAlertProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
// Custom hook to use the alert
export const useCustomAlert = () => {
    return useContext(CustomAlertContext);
};