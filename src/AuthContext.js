import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure jwt-decode is installed

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true, // Initially set to true until we verify user state
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Track whether we're still loading auth state

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to retrieve user from localStorage:", error);
    }
    setIsAuthLoading(false); // Set loading to false after we attempt to load user
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token); // Decode the token to get user data
      const userData = {
        ...decoded,
        token, // Store the token as well for API usage
      };
      localStorage.setItem("user", JSON.stringify(userData)); // Save the userData including the token to localStorage
      setUser(userData); // Update the user state
    } catch (error) {
      console.error("Failed to decode or save user data:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user"); // Remove the user data from localStorage
      setUser(null); // Reset user state to null
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isAuthLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
