import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  userUid: "",
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
  const userIdData = localStorage.getItem("userId");

  let initialToken;
  if (tokenData) {
      initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token; //changes to boolean
  const [userId, setUserId] = useState(userIdData);

 // const dispatch = useDispatch();

  /**
   * removes the token from local storage
   */
  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");

    if (logoutTimer) {
        clearTimeout(logoutTimer);
    }
  }, []);

  /**
   * retrieves the token and adds it to local storage
   * @param {*} token
   */
  const loginHandler = (token, expirationTime, userId) => {
    setToken(token);
    setUserId(userId);
    console.log("inside login handler user id" + userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("userId", userId);

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
    userUid: userId,
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
