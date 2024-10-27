import './App.css'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {UserProvider} from './utils/userContext.jsx';

import Login from './pages/login/login.jsx'
import SignUp from "./pages/sign-up/sign-up.jsx";
import ResetPass from "./pages/reset-pass/reset-pass.jsx";
import MainPage from "./pages/main-page/main-page.jsx";
import EmailVerification from "./pages/email-verification-page/email-verification-page.jsx";
import FilmPage from "./pages/film-page/film-page.jsx";
import Profile from "./pages/profile-page/profile-page.jsx";
import BookingDetailsPage from "./pages/booking-details-page/booking-details-page.jsx";
import Payment from "./pages/payment-page/payment-page.jsx";
import FilmListPage from "./pages/film-list-page/film-list-page.jsx";
import CinemaManagement from "./pages/admin-pages/cinema-management/cinema-management.jsx";
import MovieManagement from "./pages/admin-pages/movie-management/movie-management.jsx";
import AccountManagement from "./pages/admin-pages/account-management/account-management.jsx";
import AdminDashboardPage from "./pages/admin-page/admin-dashboard-page.jsx";
import {ProtectedRoute, PublicRoute} from "./filter/FilterRoute.jsx";
import {CustomAlertProvider} from "./utils/CustomAlertContext.jsx";
import BookingList from "./pages/cManager-Pages/listbooking-page/list-booking.jsx";
import RoomManagement from "./pages/cManager-Pages/room-management-page/room-management.jsx";
import CinemaDashboard from "./pages/cManager-Pages/dashboard-page/dash-board.jsx";
import SeatManagement from "./pages/cManager-Pages/seat-management-page/seat-management.jsx";
import ShowtimeManagement from "./pages/cManager-Pages/showtime-management-page/showtime-management.jsx";

// import Payment from "./pages/payment-page/payment-page.jsx";

function App() {
    return (
        <UserProvider>
            <CustomAlertProvider>
                <Router>
                    <Routes>
                        {/* Admin and Management Routes */}
                        <Route
                            path="/admin-dashboard"
                            element={<ProtectedRoute element={<AdminDashboardPage/>} requiredRole={1}/>}
                        />
                        <Route
                            path="/movie-management"
                            element={<ProtectedRoute element={<MovieManagement/>} requiredRole={1}/>}
                        />
                        <Route
                            path="/account-management"
                            element={<ProtectedRoute element={<AccountManagement/>} requiredRole={1}/>}
                        />
                        <Route
                            path="/cinema-management"
                            element={<ProtectedRoute element={<CinemaManagement/>} requiredRole={1}/>}
                        />
                        <Route path="/list-booking" element={<ProtectedRoute element={<BookingList/>} requiredRole={2}/>}/>
                        <Route path="/room-management" element={<ProtectedRoute element={<RoomManagement/>} requiredRole={2}/>}/>
                        <Route path="/showtime-management" element={<ProtectedRoute element={<ShowtimeManagement/>} requiredRole={2}/>}/>
                        <Route path="/Cmanager" element={<ProtectedRoute element={<CinemaDashboard/>} requiredRole={2}/>}/>
                        <Route path="/seat-management/:roomId" element={<ProtectedRoute element={<SeatManagement/>} requiredRole={2}/>}/>


                        {/* Protected Routes for logged-in users */}
                        <Route path="/profile" element={<ProtectedRoute element={<Profile/>}/>}/>
                        <Route path="/booking-detail" element={<ProtectedRoute element={<BookingDetailsPage/>}/>}/>


                        {/* Public Routes */}
                        <Route path="/login" element={<PublicRoute element={<Login/>} redirectTo="/profile"/>}/>
                        <Route path="/signup" element={<PublicRoute element={<SignUp/>} redirectTo="/profile"/>}/>
                        <Route path="/reset-pass"
                               element={<PublicRoute element={<ResetPass/>} redirectTo="/profile"/>}/>
                        <Route path="/email-verification"
                               element={<PublicRoute element={<EmailVerification/>} redirectTo="/profile"/>}/>

                        {/* Open Routes */}
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/film-list" element={<FilmListPage/>}/>
                        <Route path="/film-page" element={<FilmPage/>}/>
                        <Route path="/payment" element={<Payment/>}/>
                    </Routes>
                </Router>
            </CustomAlertProvider>
        </UserProvider>
    )
}


export default App
