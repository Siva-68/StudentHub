import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token and user info exist in localStorage on mount
    const storedToken = localStorage.getItem("studenthub_token");
    const storedUser = localStorage.getItem("studenthub_user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
        // Clean up invalid local storage values
        localStorage.removeItem("studenthub_token");
        localStorage.removeItem("studenthub_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("studenthub_token", newToken);
    localStorage.setItem("studenthub_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("studenthub_token");
    localStorage.removeItem("studenthub_user");
  };

  const updateProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("studenthub_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);