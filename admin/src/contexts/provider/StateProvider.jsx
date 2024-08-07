import SidebarProvider from "./SidebarProvider";
import { SnackbarProvider } from "notistack";
import PropTypes from "prop-types";
import { RoomProvider, UserProvider } from "..";

const StateProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <UserProvider>
        <RoomProvider>
          <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </RoomProvider>
      </UserProvider>
    </SidebarProvider>
  );
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
