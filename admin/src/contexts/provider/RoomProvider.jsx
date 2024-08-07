import { useState } from "react";
import PropTypes from "prop-types";
import { RoomContext } from "..";

const RoomProvider = ({ children }) => {
  // Add prop validation for 'children'
  const [rooms, setRooms] = useState(null);

  return (
    <RoomContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomContext.Provider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RoomProvider;