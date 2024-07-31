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
          percent: stats.data.booking_rate_by_day,
          color: "#84a5fa",
          hoverColor: "#96b2fb",
          timeRange: "Hôm qua",
        },
        {
          name: "Tổng số lượt đặt",
          value: stats.data.total,
          percent: stats.data.booking_rate_by_month,
          color: "#5050b2",
          hoverColor: "#6d6db2",
          timeRange: "30 ngày",
        },
        {
          name: "Lượt đặt thành công",
          value: stats.data.detail[0].confirmed,
          percent: stats.data.confirmed_rate_by_month,
          color: "#74a67e",
          hoverColor: "#83bc8e",
          timeRange: "30 ngày",
        },
        {
          name: "Lượt đặt thất bại",
          value: stats.data.detail[0].cancelled,
          percent: stats.data.cancelled_rate_by_month,
          color: "#f3797e",
          hoverColor: "#ff8f7e",
          timeRange: "30 ngày",
        },
      ]);
    };

    fetchStatistics();
  }, []);

  return dashboardStats.map((item, index) => (
    // eslint-disable-next-line react/jsx-key
    <div className="px-4 w-1/2"d>
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
          <CountUpJS endValue={item.value} />
        </p>
        <p>
          <CountUpJS endValue={item.percent} />% ({item.timeRange})
        </p>
      </div>
    </div>
  ));
}
