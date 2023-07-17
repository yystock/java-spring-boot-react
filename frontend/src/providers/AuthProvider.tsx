import { useState, useContext, createContext, FC } from "react";
import { api, setAuthHeader } from "../api/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<authContextType>({
  user: {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    api({
      method: "POST",
      url: "/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        console.log("logging in");
        setAuthHeader(response.data.token);
        setIsLoggedIn(true);
        setUser(user);
        navigate("/private");
        toast.success("Logged in Succesfully!");
        console.log("logged in");
      })
      .catch((err) => {
        setAuthHeader("");
        console.log(err);
        toast.error("Authentication failed!");
      });
  };

  const logout = () => {
    setAuthHeader("");
    setIsLoggedIn(false);
    setUser({});
  };

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
