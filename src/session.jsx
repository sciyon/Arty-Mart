import { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [selectedSessionID, setselectedSessionID] = useState(null);

  const setSessionID = (artworkID) => {
    setselectedSessionID(artworkID); // Corrected function call
  };

  return (
    <SessionContext.Provider value={{ selectedSessionID, setSessionID }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
