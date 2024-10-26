import './App.css'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { UserProvider } from './utils/userContext.jsx';

import Login from './pages/login/login.jsx'
import SignUp from "./pages/sign-up/sign-up.jsx";
import ResetPass from "./pages/reset-pass/reset-pass.jsx";
import MainPage from "./pages/main-page/main-page.jsx";
import EmailVerification from "./pages/email-verification-page/email-verification-page.jsx";
import FilmPage from "./pages/film-page/film-page.jsx";
import TestComponent from "./test/file.jsx";
import BookingList from "./pages/cManager-Pages/listbooking-page/list-booking.jsx";
import RoomManagement from "./pages/cManager-Pages/room-management-page/room-management.jsx";
import ShowtimeManagement from "./pages/cManager-Pages/showtime-management-page/showtime-management.jsx";
import CinemaDashboard from "./pages/cManager-Pages/dashboard-page/dash-board.jsx";
import SeatManagement    from "./pages/cManager-Pages/seat-management-page/seat-management.jsx";
import Profile from "./pages/profile-page/profile-page.jsx";

function App( ) {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="test" element={<TestComponent/>} />
                    <Route path="/list-booking" element={<BookingList/>} />
                    <Route path="/room-management" element={<RoomManagement/>} />
                    <Route path="/showtime-management" element={<ShowtimeManagement/>} />
                    <Route path="/Cmanager" element={<CinemaDashboard/>} />
                    <Route path="/seat-management/:roomId" element={<SeatManagement />} />


                    <Route path="/" element={<MainPage/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/reset-pass" element={<ResetPass />} />
                    <Route path="/email-verification" element={<EmailVerification />}/>
                    <Route path="/film-page" element={<FilmPage />} />

                    {/*<Route path="/payment" element={<Payment />} />*/}
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </UserProvider>
    )
}


export default App