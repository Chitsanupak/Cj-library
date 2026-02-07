import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [state, setState] = useState({
    loading: false,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/login", data);
      const token = result.data.token;


      localStorage.setItem("token", token);

   
      const userData = jwtDecode(token);

      setState({ ...state, user: userData });

      navigate("/");
    } catch (err) {
      setState({ ...state, error: "Login failed" });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;


