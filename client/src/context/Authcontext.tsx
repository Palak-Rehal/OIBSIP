import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { ReactNode } from "react";

import API from "../api/axios";
import { loginUser, getProfile } from "../api/authApi";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      try {
        const res = await getProfile();

        setUser(res.data.user);
      } catch (error) {
        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (data: LoginData) => {
    const res = await loginUser(data);

    const token = res.data.token;

    localStorage.setItem("token", token);

    API.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    const profile = await getProfile();

    setUser(profile.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");

    delete API.defaults.headers.common[
      "Authorization"
    ];

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};