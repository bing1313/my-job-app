import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
/**
 * 
 * @returns is called initially 
 */
const retrievedStoredToken = () => {
    const strToken = localStorage.getItem("token"); //this is either null or has a token
    const strExpTime = localStorage.getItem("expirationTime");

    const remainingTime = calculateRemainingTime(strExpTime);
    if (remainingTime < 3600) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null;
    }

    return {
        token: strToken,
        duration: remainingTime
    }
}

const calculateRemainingTime = (expTime) => {
  const currTime = new Date().getTime();
  const expirationTime = new Date(expTime).getTime();

  const remainingTime = expirationTime - currTime;

  return remainingTime;
};

export const AuthContextProvider = (props) => {
  const tokenData = retrievedStoredToken(); //this is an object {token: , duration: ,}

  let initialToken;
  if (tokenData) {
      initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token; //changes to boolean

  /**
   * removes the token from local storage
   */
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
        clearTimeout(logoutTimer);
    }
  }, []);

  /**
   * retrieves the token and adds it to local storage
   * @param {*} token
   */
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  /**
   * token Data is changed initially 
   */
  useEffect(() => {
      if (tokenData) {
          console.log(tokenData.duration);
        logoutTimer = setTimeout(logoutHandler, tokenData.duration);

      }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
