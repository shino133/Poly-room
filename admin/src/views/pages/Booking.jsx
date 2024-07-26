import { useState } from "react";

export default function Booking() {
  const [roomCode, setRoomCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <>
      <div className="w-4/5 mx-auto border-2 border-gray-300 p-4 rounded-md mt-10">
        <h1 className="text-center font-sans font-semibold text-3xl pt-3 pb-3">
          Đặt phòng
        </h1>

        <form>
          <div className="mb-4">
            <label htmlFor="roomCode" className="block font-medium">
              Mã phòng:
            </label>
            <input
              type="text"
              id="roomCode"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Vui lòng nhập mã"
              className="rounded border-gray-300 border p-2 w-full"
              required
              //   disabled
            />
          </div>

          <div className="mb-4">
            <label htmlFor="startTime" className="block font-medium">
              Bắt đầu:
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded border-gray-300 border p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endTime" className="block font-medium">
              Kết thúc:
            </label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded border-gray-300 border p-2 w-full"
              required
            />
            <label
              htmlFor="date"
              className="rounded border-gray-300 border p-2 w-full"
            >
              Ngày:
            </label>
          </div>``

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
