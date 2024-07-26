import { useState } from "react";

export default function Booking() {
  const [roomCode, setRoomCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");

  return (
    <>
      <div className="px-4">
        <h1 className="text-center font-bold text-blue-950 text-3xl m-4">
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
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label htmlFor="startTime" className="block font-medium">
                Bắt đầu:
              </label>
              <input
                type="datetime-local"
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
                type="datetime-local"
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
            >
              Ngày:
            </textarea>{" "}
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
