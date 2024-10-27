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

    const storagecinema = localStorage.getItem('cinema');
    const cinema = JSON.parse(storagecinema);

    return (
        <div className="cmanager-header">
            <div className="container">
                <MainPageLogo/>


                {/*<CinemaLogo logo ={cinema.logo}  />*/}
                <div className="cmanager-cinema-info">
                    <CinemaLogo logo={cinema.logo}/>
                    <span className="cmanager-cinema-name">{cinema.name}</span>
                </div>


                {
                    user ?
                        <HeaderUser user={user}/> : <LoginBtn to={"/login"}/>
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