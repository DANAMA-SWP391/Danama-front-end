import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './pages/login/login.jsx'
import SignUp from "./pages/sign-up/sign-up.jsx";
import ResetPass from "./pages/reset-pass/reset-pass.jsx";
import MainPage from "./pages/main-page/main-page.jsx";
import TestComponent from "./test/file.jsx";
// import FilmPage from "./pages/film-page/film-page.jsx";
// import Payment from "./pages/payment-page/payment-page.jsx";
// import Profile from "./pages/profile-page/profile-page.jsx";

function App() {
    return (
      <>
          <Router>
              <Routes>

                  <Route path={"/test"} element={<TestComponent />} />

                  <Route path="/" element={<MainPage />} />
                  <Route path={"/login"} element={<Login />} />
                    <Route path={"/signup"} element={<SignUp />} />
                    <Route path={"/reset-pass"} element={<ResetPass />} />
                    {/*<Route path={"/film-page"} element={<FilmPage />} />*/}
                    {/*<Route path={"/payment"} element={<Payment />} />*/}
                    {/*<Route path={"/profile"} element={<Profile />} />*/}
              </Routes>
          </Router>
      </>
  )
}

export default App
