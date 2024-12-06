import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Asegúrate de usar esta importación
import api from "../lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        api
          .get("/api/auth/verify")
          .then((response) => {
            setUser(response.data.user);
          })
          .catch(() => {
            localStorage.removeItem("token");
          });
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials); // Solo "/auth/login", NO "/api/auth/login"
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUser(data.user);
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error desconocido al iniciar sesión"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
