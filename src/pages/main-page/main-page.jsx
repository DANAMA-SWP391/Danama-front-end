import "./main-page.css";
import Body from "../../components/container/main-page/Body/Body.jsx";
import Footer from "../../components/container/main-page/Footer/Footer.jsx";
import Header from "../../components/common/Header/Header.jsx";
import {useEffect} from "react";
import {fetchHomePage} from "../../api/webAPI.jsx";

function MainPage() {
    useEffect(() => {
        fetchHomePage();
    }, []);
    return (
        <div className="main-page">
            <Header />
            <Body />
            <Footer />
        </div>
    );
}

export default MainPage;
