import PropTypes from 'prop-types';
import "./Modal.css"

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

// Xác định propTypes để kiểm tra kiểu dữ liệu của các props
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,  // isOpen phải là boolean và bắt buộc
    onClose: PropTypes.func.isRequired,  // onClose phải là hàm và bắt buộc
    children: PropTypes.node.isRequired  // children phải là node (element) và bắt buộc
};

export default Modal;
