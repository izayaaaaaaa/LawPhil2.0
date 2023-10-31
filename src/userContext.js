import React, { createContext, useReducer } from 'react';

// Actions
const SET_USER = 'SET_USER';

// Reducer function
function userReducer(state, action) {
    switch (action.type) {
        case SET_USER:
        return action.payload; // Set the new user
        default:
        return state;
    }
}

// Create context
export const UserContext = createContext();

// Context provider component
export const UserProvider = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, null); // null as the initial user (not logged in)
    
    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
    