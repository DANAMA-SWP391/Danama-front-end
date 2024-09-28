import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './pages/login/login.jsx'
import SignUp from "./pages/sign-up/sign-up.jsx";

function App() {
    return (
      <>
          <Router>
              <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/signup"} element={<SignUp />} />
              </Routes>
          </Router>
      </>
  )
}

export default App
