import "./ProfileBody.css";

import SeparateLine from "../../../common/SeparateLine/SeparateLine.jsx";
import MainBody from "../MainBody/MainBody.jsx";

function ProfileBody() {
    return (
        <div className="profile-page__body">
            <h1>Profile Management</h1>
            <SeparateLine/>
            <MainBody />
        </div>
    );
}

export default ProfileBody;