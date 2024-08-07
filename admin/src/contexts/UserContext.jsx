import { createContext } from "react";

const UserContext = createContext({
  users: null,
  setUsers: () => {},
});

export default UserContext;
