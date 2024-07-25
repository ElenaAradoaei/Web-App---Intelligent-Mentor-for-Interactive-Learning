import { createContext, useContext, useState } from 'react';

const ProgresContext = createContext();

export const ProgresProvider = ({ children }) => {
    const [progres, setProgres] = useState({});

    return (
        <ProgresContext.Provider value={{ progres, setProgres }}>
            {children}
        </ProgresContext.Provider>
    );
};

export const useProgres = () => useContext(ProgresContext);