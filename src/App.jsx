import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './utils/userContext.jsx';

import Login from './pages/login/login.jsx'
import SignUp from "./pages/sign-up/sign-up.jsx";
import ResetPass from "./pages/reset-pass/reset-pass.jsx";
import MainPage from "./pages/main-page/main-page.jsx";
import EmailVerification from "./pages/email-verification-page/email-verification-page.jsx";
import FilmPage from "./pages/film-page/film-page.jsx";
import CinemaManagement from "./pages/admin-pages/cinema-management/cinema-management.jsx";
import MovieManagement from "./pages/admin-pages/movie-management/movie-management.jsx";
import AccountManagement from "./pages/admin-pages/account-management/account-management.jsx";
import TestAdminApi from "../test/test-admin-api.jsx";
// import Payment from "./pages/payment-page/payment-page.jsx";
// import Profile from "./pages/profile-page/profile-page.jsx";

function App( ) {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/test-api" element={<TestAdminApi />} />
                    <Route path="/admin-pages" element={<CinemaManagement/>} />
                    <Route path="/movie-management" element={<MovieManagement/>} />
                    <Route path="/account-management" element={<AccountManagement/>} />
                    <Route path="/cinema-management" element={<CinemaManagement/>} />

                    <Route path="/" element={<MainPage/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/reset-pass" element={<ResetPass />} />
                    <Route path="/email-verification" element={<EmailVerification />}/>
                    <Route path="/film-page" element={<FilmPage />} />
                    {/*<Route path="/payment" element={<Payment />} />*/}
                    {/*<Route path="/profile" element={<Profile />} />*/}
                </Routes>
            </Router>
        </UserProvider>
    )
}


export default App