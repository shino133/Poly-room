import { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../constants";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [userRole, setUserRole] = useState(import.meta.env.VITE_API_ROLE || "");
  const [toast, setToast] = useState({ message: "", show: false });

  const setUserToken = (token) => {
    token //WHEN: token is already exits
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
