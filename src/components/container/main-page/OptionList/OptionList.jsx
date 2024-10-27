import "./OptionList.css";
import {useContext} from "react";
import {UserContext} from "../../../../utils/userContext.jsx";

function OptionList() {
    const handleScroll = (selector, event) => {
        event.preventDefault();
        document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
    };
    const {user} = useContext(UserContext);
    return (
        <div className="option-list">
            <div className="option">
                <a href="/film-list">Films</a>
            </div>

            {user?.roleId === 2 && (
                <div className="option">
                    <a href="/Cmanager">Management</a>
                </div>
            )}

            {user?.roleId === 1 && (
                <div className="option">
                    <a href="/admin-dashboard">Admin</a>
                </div>
            )}


            <div className="option">
                <a href="" onClick={(e) => handleScroll(".schedule-section", e)}>Schedules</a>
            </div>
        </div>

    );
}

export default OptionList;