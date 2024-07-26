import { useContext } from "react";
import { AuthContext, SidebarContext } from "./";

export const useAuthContext = () => useContext(AuthContext);
export const useSidebarContext = () => useContext(SidebarContext);
