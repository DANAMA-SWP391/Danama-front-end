import "./main-page.css";

import NotLoggedHeader from "../../components/common/NotLoggedHeader/NotLoggedHeader.jsx";
import Body from "../../components/container/main-page/Body/Body.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";

function MainPage() {
  return (
      <div className="main-page">
          <NotLoggedHeader />
          <Body />
          <Footer />
      </div>
  );
}

export default MainPage;