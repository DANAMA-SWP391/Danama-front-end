import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './utils/userContext.jsx';

import Login from './pages/login/login.jsx'
import SignUp from "./pages/sign-up/sign-up.jsx";
import ResetPass from "./pages/reset-pass/reset-pass.jsx";
import MainPage from "./pages/main-page/main-page.jsx";
import EmailVerification from "./pages/email-verification-page/email-verification-page.jsx";
import FilmPage from "./pages/film-page/film-page.jsx";
import TestComponent from "./test/file.jsx";
import BookingList from "./pages/cManager-Pages/listbooking-page/list-booking.jsx";
// import Payment from "./pages/payment-page/payment-page.jsx";
// import Profile from "./pages/profile-page/profile-page.jsx";

function App( ) {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="test" element={<TestComponent/>} />
                    <Route path="/Cmanager" element={<BookingList/>} />

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