import "./main-page.css";
import MainPageLogo from "../../components/container/main-page/MainPageLogo/MainPageLogo.jsx";
import OptionList from "../../components/container/main-page/OptionList/OptionList.jsx";
import LoginBtn from "../../components/container/main-page/LoginBtn/LoginBtn.jsx";
import Slogan from "../../components/common/Slogan 2/Slogan 2.jsx"
import SignUpBtn from "../../components/container/main-page/SignUpBtn/SignUpBtn.jsx";
import Trailer from "../../components/common/Trailer/Trailer.jsx";

function MainPage() {
  return (
      <div className="main-page">
          <div className="header">
              <div className="container">
                  <MainPageLogo />
                  <OptionList />
                  <LoginBtn />
              </div>
          </div>
          <div className="body">
              <div className="main-slide">
                  <Trailer />
                  <div className="option">
                      <Slogan />
                      <div className="sign-up">
                          <span>New Guest? <SignUpBtn>Sign Up</SignUpBtn></span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

  );
}

export default MainPage;