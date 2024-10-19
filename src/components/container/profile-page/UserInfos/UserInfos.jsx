import PropTypes from 'prop-types';
import Box from '../Box/Box';
import './UserInfos.css';
import { useState } from 'react';
import EditPopUp from "../EditPopUp/EditPopUp.jsx";

function UserInfos({ infos, onUpdate }) {
    const [selectedInfo, setSelectedInfo] = useState(null); // To store the info being edited

    const handleBoxClick = (info) => {
        if (info.title === "Email") {
            return; // Do nothing if it's the email field
        }
        setSelectedInfo(info); // Open the pop-up with the selected info for other fields
    };

    const handleClosePopup = () => {
        setSelectedInfo(null); // Close the pop-up
    };

    return (
        <div className="box-container">
            {infos.map((info, index) => (
                <div key={index} onClick={() => handleBoxClick(info)}> {/* Add onClick to open the pop-up */}
                    <Box title={info.title} content={info.content} img={info.img} />
                </div>
            ))}
            {selectedInfo && (
                <EditPopUp
                    info={selectedInfo}
                    onClose={handleClosePopup}
                    onUpdate={onUpdate} // Pass the update handler
                />
            )}
        </div>
    );
}

UserInfos.propTypes = {
    infos: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
        })
    ).isRequired,
    onUpdate: PropTypes.func.isRequired, // Pass update handler
};

export default UserInfos;
