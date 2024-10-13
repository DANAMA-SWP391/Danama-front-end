import "./main-page.css";

import Body from "../../components/container/main-page/Body/Body.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import {useContext} from "react";
import {UserContext} from "../../utils/userContext.jsx";
import Header from "../../components/common/Header/Header.jsx";

function MainPage() {
    const {user} = useContext(UserContext);

  return (
      <div className="main-page">
          <Header user={user} />
          <Body />
          <Footer />
      </div>
  );
}

export default MainPage;