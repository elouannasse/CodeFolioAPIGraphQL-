import { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, LOGOUT } from "../graphql/mutations";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [loginMutation] = useMutation(LOGIN);
  const [logoutMutation] = useMutation(LOGOUT);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: { email, password },
        },
      });

      if (data?.login) {
        const { user: userData, token: userToken } = data.login;
        setUser(userData);
        setToken(userToken);
        localStorage.setItem("token", userToken);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
