import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSidebarContext } from "../contexts/Support";
import { navigation } from "../constants";

// Container for the entire sidebar including the toggle button
const SidebarContainer = styled.div`
  width: ${(props) =>
    props.isOpen ? "250px" : "62px"}; // Width changes based on isOpen state
  transition: width 0.3s; // Smooth transition for width change
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 15px;
  position: sticky;
  top: 20px; /* Stick the sidebar to the top of the viewport */
  height: 95vh; /* Full height */
  overflow-y: auto; /* Scrollable if content overflows */
  overflow-x: hidden;
  background-color: #fff;
  box-sizing: border-box;
`;

// Style for each menu item
const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  color: #000; // Default text color
  text-decoration: none; // Remove underline
  padding: ${(props) => (props.isOpen ? "10px 20px" : "12px 20px")};

  &.active {
    font-weight: bold; // Bold font weight for active item
    color: #000; // Black text for active item
    background-color: #f0f0f0; // Gray background for active item
  }

  &:hover {
    background-color: #f0f0f0; // Hover effect for menu items
  }

  justify-content: flex-start; // Center items when closed
  white-space: nowrap; // Prevent text wrapping
`;

// Container for icons in the menu
const IconContainer = styled.div`
  margin-right: ${(props) =>
    props.isOpen ? "10px" : "0"}; // Add margin only when sidebar is open
  font-size: 20px; // Size of icons
`;

export default function Sidebar() {
  const { isOpen } = useSidebarContext();

  return (
    <SidebarContainer isOpen={isOpen}>
      {navigation.map((item, index) => (
        <MenuItem to={item.to} isOpen={isOpen} key={item.name + index}>
          <IconContainer isOpen={isOpen}>{item.icon}</IconContainer>
          {isOpen && item.name}
        </MenuItem>
      ))}
    </SidebarContainer>
  );
}
