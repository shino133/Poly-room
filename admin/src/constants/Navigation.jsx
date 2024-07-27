import {
  FaCube,
  FaPlus,
  FaCalendarAlt,
  FaHistory,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

const navigation = [
  { name: "Bảng điều khiển", to: "/", icon: <IoGrid /> },
  { name: "Quản lý phòng", to: "/manage-rooms", icon: <FaCube /> },
  { name: "Đặt phòng", to: "/book-room", icon: <FaPlus /> },
  { name: "Lịch trình", to: "/schedule", icon: <FaCalendarAlt /> },
  { name: "Lịch sử", to: "/history", icon: <FaHistory /> },
  { name: "Thống kê", to: "/statistics", icon: <FaChartLine /> },
  { name: "Người dùng", to: "/users", icon: <FaUsers /> },
];

export default navigation;
