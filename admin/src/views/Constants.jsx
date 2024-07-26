import {
  FaCube,
  FaPlus,
  FaCalendarAlt,
  FaHistory,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

export const navigation = [
  { name: "Bảng điều khiển", to: "/", icon: <IoGrid /> },
  { name: "Quản lý phòng", to: "/manage-rooms", icon: <FaCube /> },
  { name: "Đặt phòng", to: "/book-room", icon: <FaPlus /> },
  { name: "Lịch trình", to: "/schedule", icon: <FaCalendarAlt /> },
  { name: "Lịch sử", to: "/history", icon: <FaHistory /> },
  { name: "Thống kê", to: "/statistics", icon: <FaChartLine /> },
  { name: "Người dùng", to: "/users", icon: <FaUsers /> },
];

export const dashboardStats = [
  {
    name: "Lượt đặt hôm nay",
    value: 46,
    percent: "10% (30 ngày)",
    color: "#84a5fa",
    hoverColor: "#96b2fb",
  },
  {
    name: "Tổng số lượt đặt",
    value: 432,
    percent: "22% (30 ngày)",
    color: "#5050b2",
    hoverColor: "#6d6db2",
  },
  {
    name: "Lượt đặt thành công",
    value: 145,
    percent: "2% (30 ngày)",
    color: "#7978e9",
    hoverColor: "#8b8eec",
  },
  {
    name: "Lượt đặt thất bại",
    value: 97,
    percent: "0.22% (30 ngày)",
    color: "#f3797e",
    hoverColor: "#ff8f7e",
  },
];
