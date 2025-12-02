import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Usuarios demo predefinidos
const DEMO_USERS = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    name: "Richard Díaz",
    email: "richard.diaz.jimenez@outlook.com",
    role: "admin",
    avatar: "RD",
  },
  {
    id: "2",
    username: "lector",
    password: "lector123",
    name: "Usuario Demo",
    email: "lector@demo.com",
    role: "lector",
    avatar: "UD",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay sesión guardada
    const savedUser = localStorage.getItem("demo_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("demo_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("demo_user", JSON.stringify(userWithoutPassword));
      return { success: true };
    }

    return { success: false, error: "Usuario o contraseña incorrectos" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("demo_user");
  };

  const isAdmin = () => user?.role === "admin";
  const isLector = () => user?.role === "lector";

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAdmin, isLector }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}

