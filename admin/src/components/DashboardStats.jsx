import { useEffect, useState } from "react";
import { initialDashboardStats } from "../constants/";
import CountUpJS from "./CountUp";
import { getStatistics } from "../Api";

export default function DashboardStats() {
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
    <div className="px-4 w-1/2" key={item.name + index}>
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
        <p className="mb-4">{item.name}</p>
        <p className="text-[30px]">
          <CountUpJS endValue={item.value} />
        </p>
        <p>
          <CountUpJS endValue={item.percent} />% (30 ngày)
        </p>
      </div>
    </div>
  ));
}
