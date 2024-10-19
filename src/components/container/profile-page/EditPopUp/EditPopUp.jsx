import './EditPopUp.css'
import {useState} from "react";
import {upFileToAzure} from "../../../../api/webAPI.jsx";
import PropTypes from "prop-types";

function EditPopup({ info, onClose, onUpdate }) {
    const [inputValue, setInputValue] = useState(info.content);
    const [file, setFile] = useState(null); // To handle avatar file if it's selected
    const [errorMessage, setErrorMessage] = useState(''); // Error message state

    const handleSave = async () => {
        if (info.title === "Phone" && !validatePhoneNumber(inputValue)) {
            setErrorMessage("Please enter a valid phone number");
            return;
        }

        let updatedInfo = { ...info };

        // Handle avatar upload if file is selected
        if (info.title === "Avatar" && file) {
            const imageUrl = await upFileToAzure(file);
            if (imageUrl) {
                updatedInfo.content = imageUrl;
            }
        } else {
            updatedInfo.content = inputValue;
        }

        onUpdate(updatedInfo); // Pass the updated info to the parent component
        onClose(); // Close the popup
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/; // Validates phone numbers with 10-15 digits
        return phoneRegex.test(phone);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Capture the selected file
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Edit {info.title}</h3>
                {info.title === "Avatar" ? (
                    <input type="file" onChange={handleFileChange} />
                ) : (
                    <>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setErrorMessage(''); // Clear error message on change
                            }}
                            disabled={info.title === "Email"} // Disable input for email
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </>
                )}
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

EditPopup.propTypes = {
    info: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default EditPopup;