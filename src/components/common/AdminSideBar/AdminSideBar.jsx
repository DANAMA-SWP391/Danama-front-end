import Button from "../Button/Button.jsx";
import './AdminSideBar.css'; // Make sure to style the sidebar
import { MdDashboard } from "react-icons/md";
import {FaCalendarAlt, FaClipboardList} from "react-icons/fa";
import {BsDoorOpenFill} from "react-icons/bs";
import {useLocation} from "react-router-dom";



function Sidebar() {
    const location = useLocation(); // Get current path

    return (
        <div className="sidebar">
            <div className="menu">
                <Button
                    className={`menu-item ${location.pathname === "/admin-dashboard" ? "active" : ""}`}
                    to="/admin-dashboard"
                >
                    <span className="icon"><MdDashboard /></span>
                    Admin Dashboard
                </Button>
                <Button
                    className={`menu-item ${location.pathname === "/cinema-management" ? "active" : ""}`}
                    to="/cinema-management"
                >
                    <span className="icon"><FaClipboardList /></span>
                    Cinema Management
                </Button>
                <Button
                    className={`menu-item ${location.pathname === "/movie-management" ? "active" : ""}`}
                    to="/movie-management"
                >
                    <span className="icon"><BsDoorOpenFill /></span>
                    Movie Management
                </Button>
                <Button
                    className={`menu-item ${location.pathname === "/account-management" ? "active" : ""}`}
                    to="/account-management"
                >
                    <span className="icon"><FaCalendarAlt /></span>
                    Account Management
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;
