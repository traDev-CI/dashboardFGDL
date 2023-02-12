import React, { useEffect, useState, createContext } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccesToken,
  getRefreshToken,
  refreshAccessToken,
  logout
} from "../api/auth";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true
  });

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const checkUserLogin = (setUser) => {
  const accessToekn = getAccesToken();
  if (!accessToekn) {
    const refreshtoken = getRefreshToken();
    if (!refreshtoken) {
      logout();
      setUser({ user: null, isLoading: false });
    } else {
      refreshAccessToken(refreshtoken);
    }
  } else {
    setUser({ isLoading: false, user: jwtDecode(accessToekn) });
  }
};

export { AuthProvider, AuthContext };
