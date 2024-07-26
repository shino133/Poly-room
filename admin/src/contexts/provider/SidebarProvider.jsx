import { useState } from "react";
import PropTypes from "prop-types";
import { SidebarContext } from "..";

const SidebarProvider = ({ children }) => {
  // Add prop validation for 'children'
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarProvider;