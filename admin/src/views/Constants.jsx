import React, { useState, useEffect } from "react";
import {
  FaCube,
  FaPlus,
  FaCalendarAlt,
  FaHistory,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { getStatistics } from "../Api";

export const navigation = [
  { name: "Bảng điều khiển", to: "/", icon: <IoGrid /> },
  { name: "Quản lý phòng", to: "/manage-rooms", icon: <FaCube /> },
  { name: "Đặt phòng", to: "/book-room", icon: <FaPlus /> },
  { name: "Lịch trình", to: "/schedule", icon: <FaCalendarAlt /> },
  { name: "Lịch sử", to: "/history", icon: <FaHistory /> },
  { name: "Thống kê", to: "/statistics", icon: <FaChartLine /> },
  { name: "Người dùng", to: "/users", icon: <FaUsers /> },
];

const initialDashboardStats = [
  {
    name: "Lượt đặt hôm nay",
    value: 0,
    percent: "0% (30 ngày)",
    color: "#84a5fa",
    hoverColor: "#96b2fb",
  },
  {
    name: "Tổng số lượt đặt",
    value: 0,
    percent: "0% (30 ngày)",
    color: "#5050b2",
    hoverColor: "#6d6db2",
  },
  {
    name: "Lượt đặt thành công",
    value: 0,
    percent: "0% (30 ngày)",
    color: "#7978e9",
    hoverColor: "#8b8eec",
  },
  {
    name: "Lượt đặt thất bại",
    value: 0,
    percent: "0% (30 ngày)",
    color: "#f3797e",
    hoverColor: "#ff8f7e",
  },
];

export const DashboardStats = () => {
  const [dashboardStats, setDashboardStats] = useState(initialDashboardStats);

  useEffect(() => {
    const fetchStatistics = async () => {
      const stats = await getStatistics();
      console.log("stats", stats);

      setDashboardStats([
        {
          name: "Lượt đặt hôm nay",
          value: stats.data.today,
          percent: ` (30 ngày)`,
          color: "#84a5fa",
          hoverColor: "#96b2fb",
        },
        {
          name: "Tổng số lượt đặt",
          value: stats.data.total,
          percent: ` (30 ngày)`,
          color: "#5050b2",
          hoverColor: "#6d6db2",
        },
        {
          name: "Lượt đặt thành công",
          value: stats.data.detail[0].total_confirmed,
          percent: ` (30 ngày)`,
          color: "#7978e9",
          hoverColor: "#8b8eec",
        },
        {
          name: "Lượt đặt thất bại",
          value: stats.data.detail[0].total_cancelled,
          percent: ` (30 ngày)`,
          color: "#f3797e",
          hoverColor: "#ff8f7e",
        },
      ]);
    };

    fetchStatistics();
  }, []);

  return dashboardStats.map((item, index) => (
    <div className="px-4 w-1/2">
      <div
        className="p-5 rounded-3xl text-white mb-6 transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: item.color,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = item.hoverColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = item.color)
        }
      >
        <p class="mb-4">{item.name}</p>
        <p class="text-[30px]">{item.value}</p>
        <p>{item.percent}</p>
      </div>
    </div>
  ));
};
