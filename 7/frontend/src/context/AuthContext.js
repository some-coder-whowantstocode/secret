import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, role = 'user',_id) => {
    setUser({ username, role,_id });
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (username, password, role) => {
    login(username, role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
