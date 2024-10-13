import "./ChangePass.css";
import InputBox from "../../../common/InputBox/InputBox.jsx";

function ChangePass() {
    return(
        <>
            <InputBox title="Old Password" type="password" placeholder="Enter Password" />
            <InputBox title="New Password" type="password" placeholder="Enter New Password" />
            <InputBox title="Confirm New Password" type="password" placeholder="Confirm Password" />
            <button className="btn">Change Password</button>
        </>
    );
}

export default ChangePass;