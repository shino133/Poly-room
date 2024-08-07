import { createContext } from "react";

const RoomContext = createContext({
  rooms: null,
  setRooms: () => {},
});

export default RoomContext;
