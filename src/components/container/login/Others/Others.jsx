import './Others.css';

import { Link } from 'react-router-dom';

import GoogleSignIn from "../GoogleSignIn/GoogleSignIn.jsx";

function OtherContainer() {
    return (
        <div className="others">
            <p>Don&apos;t have an account? <Link to="/signup" className="custom-link">Sign up</Link></p>
            <p>Or</p>
            <GoogleSignIn />
        </div>
    );
}

export default OtherContainer;