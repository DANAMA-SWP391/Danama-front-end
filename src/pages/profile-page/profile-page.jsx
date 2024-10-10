import "./profile-page.css";
import NotLoggedHeader from "../../components/common/NotLoggedHeader/NotLoggedHeader.jsx";
import SeparateLine from "../../components/common/SeparateLine/SeparateLine.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import User from "../../components/container/profile-page/User/User.jsx";
import Options from "../../components/container/profile-page/Options/Options.jsx";

function Profile() {
  return (
    <div className="profile-page">
        <NotLoggedHeader />
        <div className="profile-page__body">
            <h1>Profile Management</h1>
            <SeparateLine/>
            <div>
                <div className="body__left-container">
                    <User />
                    <Options />
                </div>
                <div className="body__right-container">
                    <h2>User Information</h2>
                    <div className="box-container">
                        <div className="right-container__box">
                            <p>Name</p>
                            <p>Châu Tùng Đăng</p>
                        </div>
                        <div className="right-container__box">
                            <p>Email</p>
                            <p>tungdang.nbk.9a5@gmail.com</p>
                        </div>
                        <div className="right-container__box">
                            <p>Phone</p>
                            <p>0912345678</p>
                        </div>
                        <div className="right-container__box">
                            <p>Avatar</p>
                            <div className="box__avatar">
                                <img src="https://via.placeholder.com/150" alt="avatar"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  );
}

export default Profile;