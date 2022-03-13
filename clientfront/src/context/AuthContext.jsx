import { createContext, useState, useEffect } from "react";
import { tokenAuth } from "../axios/authTokenHeaders";
import clientAxios from "../axios/clientAxios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await clientAxios.get("/auth", tokenAuth());

        setAuth(data);
      } catch (error) {
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    authUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        auth,
        response, 
        setAuth,
        setResponse,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
