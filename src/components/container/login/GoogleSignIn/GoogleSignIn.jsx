import "./GoogleSignIn.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {loginByGoogle} from "../../../../api/authAPI.js";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../../../utils/userContext.jsx";
import {useCustomAlert} from "../../../../utils/CustomAlertContext.jsx";


function GoogleSignIn() {
    const showAlert = useCustomAlert();
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSuccess = async (response) => {
        try {
            const token = response.credential;
            // Call the loginByGoogle function with the token
            const data = await loginByGoogle(token);
            setUser(data.user);
            if(data.user.roleId === 1) {
                navigate('/admin-dashboard')
            } else if(data.user.roleId === 2){
                navigate('/Cmanager');
            }
            else {
                navigate('/');
            }
        } catch (error) {
            showAlert("Error during google login!");
            console.error("Error during Google login:", error);
        }
    };

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