import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  FaCube,
  FaPlus,
  FaCalendarAlt,
  FaHistory,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { useSidebarContext } from "../contexts/Support";

// Container for the entire sidebar including the toggle button
const SidebarContainer = styled.div`
  width: ${(props) =>
    props.isOpen ? "250px" : "60px"}; // Width changes based on isOpen state
  transition: width 0.3s; // Smooth transition for width change
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 15px;
  position: sticky;
  top: 20px; /* Stick the sidebar to the top of the viewport */
  height: 80vh; /* Full height */
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

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarContext();

  return (
    <SidebarContainer isOpen={isOpen}>
      <MenuItem exact="true" to="/" isOpen={isOpen}>
        <IconContainer isOpen={isOpen}>
          <IoGrid />
        </IconContainer>
        {isOpen && "Bảng điều khiển"}
      </MenuItem>
      <MenuItem to="/manage-rooms" isOpen={isOpen}>
        <IconContainer isOpen={isOpen}>
          <FaCube />
        </IconContainer>
        {isOpen && "Quản lý phòng"}
      </MenuItem>
      <MenuItem to="/book-room" isOpen={isOpen}>
        <IconContainer isOpen={isOpen}>
          <FaPlus />
        </IconContainer>
        {isOpen && "Đặt phòng"}
      </MenuItem>
      <MenuItem to="/schedule" isOpen={isOpen}>
        <IconContainer isOpen={isOpen}>
          <FaCalendarAlt />
        </IconContainer>
        {isOpen && "Lịch trình"}
      </MenuItem>
      <MenuItem to="/history" isOpen={isOpen}>
        <IconContainer isOpen={isOpen}>
          <FaHistory />
        </IconContainer>
        {isOpen && "Lịch sử"}
      </MenuItem>
      <MenuItem to="/statistics" isOpen={isOpen}>
        <IconContainer isOpen={isOpen}>
          <FaChartLine />
        </IconContainer>
        {isOpen && "Thống kê"}
      </MenuItem>
      <MenuItem to="/users" isOpen={isOpen}>
        <IconContainer isOpen={isOpen}>
          <FaUsers />
        </IconContainer>
        {isOpen && "Người dùng"}
      </MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
