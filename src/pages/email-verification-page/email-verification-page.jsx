import "./email-verification-page.css";
import {useNavigate} from "react-router-dom";

function EmailVerification() {
    const passcode = '123456';
    const navigate = useNavigate();

    const handleClick = () => {
        const code = document.querySelector('input').value;
        if (code === passcode) {
            alert('Verification successful');
        } else {
            alert('Verification failed');
        }
        navigate('/login');
    }

  return (
    <div className="email-verification-page">
      <div className="email-verification-box">
        <h1>Email Verification</h1>
        <p>
          Please check your email for the verification code. Enter the code
          below to verify your account.
        </p>
        <input type="text" placeholder="Enter code" />
        <button onClick={handleClick}>Verify</button>
      </div>
    </div>
  );
}

export default EmailVerification;