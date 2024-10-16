import Button from "../Button/Button.jsx";
import './CManagerSideBar.css'; // Make sure to style the sidebar
import { MdDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { BsDoorOpenFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";


function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">
                <h2>DANAMA</h2>
            </div>
            <div className="menu">
                <Button className="menu-item" to="/cinema-dashboard">
                    <span className="icon"><MdDashboard style={{ fontSize: '20px' }} /></span>
                    Cinema Dashboard
                </Button>
                <Button className="menu-item" to="/Cmanager">
                    <span className="icon"><FaClipboardList style={{ fontSize: '20px' }} /></span>
                    Booking List
                </Button>
                <Button className="menu-item" to="/room-management">
                    <span className="icon"><BsDoorOpenFill style={{ fontSize: '20px' }}/></span>
                    Room Management
                </Button>
                <Button className="menu-item" to="/showtime-management">
                    <span className="icon"><FaCalendarAlt style={{ fontSize: '20px' }} /></span>
                    Showtime Management
                </Button>
            </div>
        </div>

    );
}

export default Sidebar;
