import { createContext } from "react";

const SidebarContext = createContext({
  isOpen : true,
  toggleSidebar : () => {},
});

export default SidebarContext;

