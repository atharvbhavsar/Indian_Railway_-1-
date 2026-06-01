import React, { createContext, useContext, useState, useEffect } from "react";
import { logger } from "../logger";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem("rses_session");
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setCurrentUser(parsed);
        setIsLoggedIn(true);
      } catch (e) {
        logger.error("Failed to parse saved session", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("rses_session", JSON.stringify(userData));
    logger.audit("LOGIN", userData.hrmsId, "SUCCESS", `Logged in as ${userData.role}`);
  };

  const logout = () => {
    if (currentUser) {
      logger.audit("LOGOUT", currentUser.hrmsId, "SUCCESS", "User requested logout");
    }
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("rses_session");
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
