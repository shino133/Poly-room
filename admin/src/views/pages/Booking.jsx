import { useState } from "react";

export default function Booking() {
  const [roomCode, setRoomCode] = useState("");
  // const [userCode, setUserCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState(""); // Thêm trạng thái cho ghi chú

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý gửi biểu mẫu ở đây
    console.log("Room Code:", roomCode);
    console.log("User Code:", userCode);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Date:", date);
    console.log("Note:", note);
  };

  return (
    <>
      <div className="w-4/5 mx-auto  p-4 rounded-md mt-10">
        <h1 className="text-center font-sans font-semibold text-3xl pt-3 pb-3">
          Đặt phòng
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="roomCode" className="block font-medium">
              Mã phòng:
            </label>
            <input
              type="text"
              id="roomCode"
              name="roomCode"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Vui lòng nhập mã"
              className="rounded border-gray-300 border p-2 w-full"
              required
            />
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label htmlFor="startTime" className="block font-medium">
                Bắt đầu:
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="rounded border-gray-300 border p-2 w-full"
                required
              />
            </div>

            <div className="flex-1">
              <label htmlFor="endTime" className="block font-medium">
                Kết thúc:
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="rounded border-gray-300 border p-2 w-full"
                required
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="note" className=" font-medium">
              Ghi chú:
            </label>
            <textarea
              id="note"
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="rounded border-gray-300 border p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Gửi
          </button>
        </form>
      </div>
    </>
  );
}
