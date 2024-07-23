import { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../constants";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [userRole, setUserRole] = useState("client");
  const [questionTypes] = useState([
    "text",
    "select",
    "radio",
    "checkbox",
    "textarea",
  ]);
  const [toast, setToast] = useState({ message: "", show: false });

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
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
        questionTypes,
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
