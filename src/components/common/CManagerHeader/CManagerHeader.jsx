import MainPageLogo from "../../container/main-page/MainPageLogo/MainPageLogo.jsx";
// import OptionList from "../../container/main-page/OptionList/OptionList.jsx";
import LoginBtn from "../../container/main-page/LoginBtn/LoginBtn.jsx";
import PropTypes from 'prop-types';
import HeaderUser from "../HeaderUser/HeaderUser.jsx";
import {useContext} from "react";
import {UserContext} from "../../../utils/userContext.jsx";
import './CManagerHeader.css' ;
import CinemaLogo from "../CinemaLogo/CinemaLogo.jsx";


// import cinemaLogo from "../CinemaLogo/CinemaLogo.jsx";
// import CinemaLogo from "../CinemaLogo/CinemaLogo.jsx";

function CManagerHeader() {
    const {user} = useContext(UserContext);
    console.log(user);

    const logo = "/src/assets/cinemaLogos/cgv.jpg";
    // const cinemalogo = "CGV"

    return (
        <div className="header">
            <div className="container">
                <MainPageLogo />
                {/*<OptionList />*/}


                {/*<CinemaLogo logo ={logo} name={cinemalogo} />*/}
                <CinemaLogo logo ={logo}  />

                {
                    user ?
                        <HeaderUser user={user} /> : <LoginBtn to={"/login"} />
                }
            </div>
        </div>
    );
}

CManagerHeader.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

export default CManagerHeader;