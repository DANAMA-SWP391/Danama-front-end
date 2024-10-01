import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './pages/login/login.jsx'
import SignUp from "./pages/sign-up/sign-up.jsx";
import ResetPass from "./pages/reset-pass/reset-pass.jsx";
import MainPage from "./pages/main-page/main-page.jsx";

function App() {
    return (
      <>
          <Router>
              <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/signup"} element={<SignUp />} />
                    <Route path={"/reset-pass"} element={<ResetPass />} />
              </Routes>
          </Router>
      </>
  )
}

export default App
