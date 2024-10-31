import Button from "../Button/Button.jsx";
import './CManagerSideBar.css'; // Make sure to style the sidebar
import { MdDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { BsDoorOpenFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { useLocation } from "react-router-dom";


function Sidebar() {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>DANAMA</h2>
            </div>
            <div className="menu">
                {/*<Button className="menu-item" to="/Cmanager">*/}
                {/*    <span className="icon"><MdDashboard style={{ fontSize: '20px' }} /></span>*/}
                {/*    Cinema Dashboard*/}
                {/*</Button>*/}
                <Button
                    className={`menu-item ${location.pathname === "/Cmanager" ? "active" : ""}`}
                    to="/Cmanager"
                >
                    <span className="icon"><MdDashboard style={{ fontSize: '20px' }} /></span>
                    Cinema Dashboard
                </Button>
                {/*<Button className="menu-item" to="/list-booking">*/}
                {/*    <span className="icon"><FaClipboardList style={{ fontSize: '20px' }} /></span>*/}
                {/*    Booking List Page*/}
                {/*</Button>*/}
                {/*<Button className="menu-item" to="/room-management">*/}
                {/*    <span className="icon"><BsDoorOpenFill style={{ fontSize: '20px' }}/></span>*/}
                {/*    Room Management*/}
                {/*</Button>*/}
                {/*<Button className="menu-item" to="/showtime-management">*/}
                {/*    <span className="icon"><FaCalendarAlt style={{ fontSize: '20px' }} /></span>*/}
                {/*    Showtime Management*/}
                {/*</Button>*/}
                <Button
                    className={`menu-item ${location.pathname === "/list-booking" ? "active" : ""}`}
                    to="/list-booking"
                >
                    <span className="icon"><FaClipboardList style={{ fontSize: '20px' }} /></span>
                    Booking List Page
                </Button>
                <Button
                    className={`menu-item ${location.pathname === "/room-management" ? "active" : ""}`}
                    to="/room-management"
                >
                    <span className="icon"><BsDoorOpenFill style={{ fontSize: '20px' }}/></span>
                    Room Management
                </Button>
                <Button
                    className={`menu-item ${location.pathname === "/showtime-management" ? "active" : ""}`}
                    to="/showtime-management"
                >
                    <span className="icon"><FaCalendarAlt style={{ fontSize: '20px' }} /></span>
                    Showtime Management
                </Button>

                <Button
                    className={`menu-item ${location.pathname === "/movie-request" ? "active" : ""}`}
                    to="/movie-request"
                >
                    <span className="icon"><BiMoviePlay style={{ fontSize: '20px' }} /></span>
                    Movie Request
                </Button>
            </div>
        </div>

    );
}

export default Sidebar;
