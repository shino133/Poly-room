import people from "../../assets/people.svg";

export default function Dashboard() {
  const data = [
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
      name: "Tổng số cuộc họp",
      value: 145,
      percent: "2% (30 ngày)",
      color: "#7978e9",
      hoverColor: "#8b8eec",
    },
    {
      name: "Tổng số người dùng",
      value: 97,
      percent: "0.22% (30 ngày)",
      color: "#f3797e",
      hoverColor: "#ff8f7e",
    },
  ];
  return (
    <>
      <div className="m-4">
        <h1 className="text-[25px] font-medium">
          Chào mừng, {JSON.parse(localStorage.getItem("CURRENT_USER")).name}!
        </h1>

        <div className="mt-4 flex flex-row">
          <div className="w-1/2 mb-5 pr-4">
            <div className="relative bg-[#DAE7FF] pt-14 rounded-3xl overflow-hidden">
              <img src={people} alt="people" className="w-full" />
            </div>
          </div>
          <div className="w-1/2 mb-5">
            <div className="flex flex-wrap flex-row -mr-4">
              {data.map((item) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
