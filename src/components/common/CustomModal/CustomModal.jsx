import React from 'react';
import PropTypes from 'prop-types'; // Import prop-types
// Import your CSS

const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="modal-close-btn" onClick={onClose}>X</button>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Adding propTypes validation
CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,  // 'isOpen' should be a boolean and is required
    onClose: PropTypes.func.isRequired, // 'onClose' should be a function and is required
    children: PropTypes.node.isRequired, // 'children' can be any renderable node and is required
};

export default CustomModal;