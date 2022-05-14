import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducers';

const GlobalContext = createContext();

const ContextStateUpdated = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider
            value={{
                state,
                dispatch,
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, ContextStateUpdated };
