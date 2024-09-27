import './OtherContainer.css';

import { Link } from 'react-router-dom';

function OtherContainer() {
    return (
        <div className="others">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Don't have an account? <Link to="/signup" className="custom-link">Sign up</Link></p>
            <p>Or</p>
            <p>Login by <Link to="/" className="custom-link" ></Link></p>
        </div>
    );
}

export default OtherContainer;