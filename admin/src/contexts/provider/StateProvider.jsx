import { SidebarProvider } from ".."
import PropTypes from "prop-types";

export const StateProvider = ({ children }) => {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
