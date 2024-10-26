import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {UserProvider} from "./utils/userContext.jsx";
import { WebProvider} from "./utils/webContext.jsx";

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <WebProvider>
        <StrictMode>
            <App />
        </StrictMode>
        </WebProvider>
    </UserProvider>
)
