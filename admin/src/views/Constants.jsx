import React, { useState, useEffect, useRef } from "react";
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
import { CountUp } from "countup.js";

export const navigation = [
  { name: "Bảng điều khiển", to: "/", icon: <IoGrid /> },
  { name: "Quản lý phòng", to: "/manage-rooms", icon: <FaCube /> },
  { name: "Đặt phòng", to: "/book-room", icon: <FaPlus /> },
  { name: "Lịch trình", to: "/schedule", icon: <FaCalendarAlt /> },
  { name: "Lịch sử", to: "/history", icon: <FaHistory /> },
  { name: "Thống kê", to: "/statistics", icon: <FaChartLine /> },
  { name: "Người dùng", to: "/users", icon: <FaUsers /> },
];

export const statusTranslations = {
  Available: "Có sẵn",
  Occupied: "Đã có người",
  Maintenance: "Bảo trì",
  Cleaning: "Đang dọn dẹp",
};

export const roomTypeMap = {
  "Conference Room": 1,
  "Office Room": 2,
  "Lecture Room": 4,
  "Break Room": 5,
};

export const roomTypeTranslations = {
  "Conference Room": "Phòng họp",
  "Meeting Room": "Phòng họp",
  "Office Room": "Văn phòng",
  "Lecture Room": "Phòng học",
  "Break Room": "Phòng tự học",
  Other: "Khác",
};

const initialDashboardStats = [
  {
    name: "Lượt đặt hôm nay",
    value: 0,
    percent: 0,
    color: "#84a5fa",
    hoverColor: "#96b2fb",
  },
  {
    name: "Tổng số lượt đặt",
    value: 0,
    percent: 0,
    color: "#5050b2",
    hoverColor: "#6d6db2",
  },
  {
    name: "Lượt đặt thành công",
    value: 0,
    percent: 0,
    color: "#7978e9",
    hoverColor: "#8b8eec",
  },
  {
    name: "Lượt đặt thất bại",
    value: 0,
    percent: 0,
    color: "#f3797e",
    hoverColor: "#ff8f7e",
  },
];

const CountUpComponent = ({ endValue }) => {
  const countUpRef = useRef(null);

  useEffect(() => {
    const countUp = new CountUp(countUpRef.current, endValue);
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  }, [endValue]);

  return <span ref={countUpRef}></span>;
};

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
          percent: 24,
          color: "#84a5fa",
          hoverColor: "#96b2fb",
        },
        {
          name: "Tổng số lượt đặt",
          value: stats.data.total,
          percent: stats.data.booking_rate_by_month,
          color: "#5050b2",
          hoverColor: "#6d6db2",
        },
        {
          name: "Lượt đặt thành công",
          value: stats.data.detail[0].total_confirmed,
          percent: 78,
          color: "#7978e9",
          hoverColor: "#8b8eec",
        },
        {
          name: "Lượt đặt thất bại",
          value: stats.data.detail[0].total_cancelled,
          percent: 38,
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
        <p class="text-[30px]">
          <CountUpComponent endValue={item.value} />
        </p>
        <p>
          <CountUpComponent endValue={item.percent} />% (30 ngày)
        </p>
      </div>
    </div>
  ));
};
