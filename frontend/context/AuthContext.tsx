"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingPage from "@/components/LoadingPage";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (us: string, pw: string) => Promise<void>;
  register: (us: string, pw: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      console.log(savedToken);
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login/",
        {
          email: email,
          password: password,
          expiresInMins: 30,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const authToken = response.data.accessToken;
      setToken(authToken);
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", authToken);
      }
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register/",
        {
          email: email,
          password: password,
          expiresInMins: 30,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
