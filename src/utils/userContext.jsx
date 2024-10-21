import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State for user information
    const [filmList, setFilmList] = useState([]); // State for film list

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Use 'user' as the key
        console.log(storedUser);
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse the user string back into an object
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Use 'user' as the key
        } else {
            localStorage.removeItem('user'); // Remove user data if user is logged out
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
