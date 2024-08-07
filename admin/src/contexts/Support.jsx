import { useContext } from "react";
import { AuthContext, SidebarContext ,RoomContext , UserContext} from "./";

export const useAuthContext = () => useContext(AuthContext);
export const useSidebarContext = () => useContext(SidebarContext);
export const useRoomContext = () => useContext(RoomContext);
export const useUserContext = () => useContext(UserContext);

export const useStateContext = () => {
  const auth = useAuthContext();
  const sidebar = useSidebarContext();
  const room = useRoomContext();
  const user = useUserContext();

  return { auth, sidebar ,room ,user };
}