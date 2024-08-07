import { useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "..";

const UserProvider = ({ children }) => {
  // Add prop validation for 'children'
  const [users, setUsers] = useState(null);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;