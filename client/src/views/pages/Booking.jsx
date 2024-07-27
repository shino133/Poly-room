import { bookingRequest } from "../../Api";
import { useState } from "react";

export default function Booking() {
  const [roomId, setRoomId] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [note, setNote] = useState();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const dataList = {
        room_id: roomId,
        start_at: startTime,
        end_at:endTime,
        note : note,
    };

    console.log({
        room_id: roomId,
        start_at: startTime,
        end_at:endTime,
        note : note,
    })

    bookingRequest(dataList).then(
        (data) => {
            console.log('Success:', data);
        }
    )
  };



  return (
    <>
      <div  className="bg-white p-8 m-24 rounded-lg shadow-lg w-5/4">
        <h1 className="text-2xl font-bold mb-4">Book a Classroom</h1>
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="room-id" className="block text-gray-700">
                Room ID
              </label>
              <input
                type="text"
                id="room-id"
                name="room-id"
                onChange={(ev) => setRoomId(ev.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter the room ID"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time-start" className="block text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                id="time-start"
                name="time-start"
                onChange={(ev) => setStartTime(ev.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time-end" className="block text-gray-700">
                End Time
              </label>
              <input
                type="time"
                id="time-end"
                name="time-end"
                onChange={(ev) => setEndTime(ev.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="md:col-span-2 mb-4">
              <label htmlFor="note" className="block text-gray-700">
                Note
              </label>
              <textarea
                id="note"
                name="note"
                onChange={(ev) => setNote(ev.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter any notes or special requests"
                defaultValue={""}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            Book Now
          </button>
        </form>
      </div>
    </>
  );
}
