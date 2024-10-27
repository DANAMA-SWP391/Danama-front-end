import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {UserContext} from "../utils/userContext.jsx";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ element, requiredRole }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        // Redirect to login if the user is not logged in
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.roleId !== requiredRole) {
        // If user does not have the required role, redirect to main page
        return <Navigate to="/" />;
    }

    return element;
};

// eslint-disable-next-line react/prop-types
export const PublicRoute = ({ element, redirectTo }) => {
    const { user } = useContext(UserContext);

    return user ? <Navigate to={redirectTo} /> : element;
};