import "./profile-page.css";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import ProfileBody from "../../components/container/profile-page/ProfileBody/ProfileBody.jsx";
import Header from "../../components/common/Header/Header.jsx";

function Profile() {
  return (
    <div className="profile-page">
        <Header />
        <ProfileBody />
        <Footer/>
    </div>
  );
}

export default Profile;