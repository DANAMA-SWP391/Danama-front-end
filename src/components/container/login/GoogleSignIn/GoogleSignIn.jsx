import "./GoogleSignIn.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


function GoogleSignIn() {
    const handleSuccess = (response) => {
        console.log("Google Sign-In successful. Token:", response);
    }

    const handleError = (error) => {
        console.log("Google Sign-In failed. Error:", error);
    }

    return (
        <GoogleOAuthProvider clientId={"1057976212312-fjk08o0u6klggbc06l4c4j6gulnskamn.apps.googleusercontent.com"} >
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </GoogleOAuthProvider>
    );
}

export default GoogleSignIn;