import SidebarProvider from "./SidebarProvider";
import { SnackbarProvider } from "notistack";
import PropTypes from "prop-types";

const StateProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </SidebarProvider>
  );
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
