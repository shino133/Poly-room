import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { SidebarContext } from "./SidebarContext";

export const useAuthContext = () => useContext(AuthContext);
export const useSidebarContext = () => useContext(SidebarContext);
