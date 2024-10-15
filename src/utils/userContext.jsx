import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [filmList, setFilmList] = useState([]);

    return (
        <UserContext.Provider value={{ user, setUser, filmList, setFilmList }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};