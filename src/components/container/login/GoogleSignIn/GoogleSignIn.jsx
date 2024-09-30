import "./GoogleSignIn.css";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function GoogleSignIn() {
    const handleSuccess = (response) => {
        console.log("Google Sign-In successful. Token:", response.credential);
    }

    const handleError = (error) => {
        console.log("Google Sign-In failed. Error:", error);
    }

    return (
        <GoogleOAuthProvider clientId="1057976212312-k4a01hpamvopr9j9q6fuc8u31vpv0g17.apps.googleusercontent.com">
            <div>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </div>
        </GoogleOAuthProvider>
    );
}

export default GoogleSignIn;