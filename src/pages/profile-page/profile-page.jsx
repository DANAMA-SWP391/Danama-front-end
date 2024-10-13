import "./profile-page.css";
import NotLoggedHeader from "../../components/common/NotLoggedHeader/NotLoggedHeader.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import ProfileBody from "../../components/container/profile-page/ProfileBody/ProfileBody.jsx";

function Profile() {
  return (
    <div className="profile-page">
        <NotLoggedHeader />
        <ProfileBody />
        <Footer/>
    </div>
  );
}

export default Profile;