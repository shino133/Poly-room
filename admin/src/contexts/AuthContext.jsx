import { createContext } from "react";

const AuthContext = createContext({
  currentUser: {},
  userToken: null,
  toast: {
    message: null,
    show: false,
  },
  setCurrentUser: () => {},
  setUserToken: () => {},
});

export default AuthContext;