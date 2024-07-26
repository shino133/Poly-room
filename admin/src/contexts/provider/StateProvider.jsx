import SidebarProvider from "./SidebarProvider";
import PropTypes from "prop-types";

const StateProvider = ({ children }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
