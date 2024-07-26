import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../AuthContext";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [userRole, setUserRole] = useState(import.meta.env.VITE_API_ROLE || "");
  const [toast, setToast] = useState({ message: "", show: false });

  const setUserToken = (token) => {
    token //WHEN: token is already exists
      ? localStorage.setItem("TOKEN", token)
      : localStorage.removeItem("TOKEN");
    _setUserToken(token);
  };

  const showToast = (message) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 5000);
  };

  // Set CURRENT_USER in localStorage only once
  useEffect(() => {
    if (
      localStorage.getItem("CURRENT_USER") == "{}" ||
      !localStorage.getItem("CURRENT_USER")
    ) {
      localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userToken,
        userRole,
        toast,
        showToast,
        setCurrentUser,
        setUserToken,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
