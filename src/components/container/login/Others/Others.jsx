import './Others.css';

import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

function OtherContainer() {
    return (
        <div className="others">
            <p>Don&apos;t have an account? <Link to="/signup" className="custom-link">Sign up</Link></p>
            <p>Or</p>
            <p>Login by <Link to="/" className="custom-link" ><GoogleIcon className="google-icon" /></Link></p>
        </div>
    );
}

export default OtherContainer;