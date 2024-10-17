import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State for user information
    const [filmList, setFilmList] = useState([]); // State for film list

    // Load user data from localStorage when the component mounts
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        console.log(storedUser);
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse the user string back into an object
        }
    }, []);


    // Save user data to localStorage whenever the user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('userData', JSON.stringify(user)); // Save user data
        } else {
            localStorage.removeItem('userData'); // Remove user data if user is logged out
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, filmList, setFilmList }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
