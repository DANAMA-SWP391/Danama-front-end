import "./main-page.css";

import NotLoggedHeader from "../../components/common/NotLoggedHeader/NotLoggedHeader.jsx";
import Body from "../../components/container/main-page/Body/Body.jsx";

function MainPage() {
  return (
      <div className="main-page">
          <NotLoggedHeader />
          <Body />
      </div>
  );
}

export default MainPage;