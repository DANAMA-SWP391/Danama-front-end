import './ErrMsgBox.css';

// eslint-disable-next-line react/prop-types
function ErrMsgBox({ children, isSuccess }) {
    return (
        <div className={`err-msg ${!isSuccess ? 'show' : ''}`}>
            {children}
        </div>
    );
}

export default ErrMsgBox;