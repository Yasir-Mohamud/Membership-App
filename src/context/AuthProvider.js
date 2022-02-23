import { createContext, useState } from "react";

// set your context
const AuthContext = createContext({});

// children is all the componenets that are nested in the AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
