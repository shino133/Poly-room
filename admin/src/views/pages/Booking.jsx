import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { getRoomData } from "../../Api";

export default function Booking() {
  const [roomCode, setRoomCode] = useState("");
  // const [userCode, setUserCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [rooms, setRooms] = useState([]);
  const [options, setOptions] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);

  useEffect(() => {
    getRoomData() // Convert to one-based index for API
      .then(({ data }) => {
        setRooms(data);
        console.log("rooms", data);
      })
      .catch((error) => {
        console.log(error);
      });

    const newOptions = [];
    for (let i = 0; i < 10; i++) {
      newOptions.push({ label: `This is option ${i}`, value: i });
    }
    setOptions(newOptions);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      room_id: roomCode,
      start_at: startTime,
      end_at: endTime,
      note: note,
    });
  };

  return (
    <>
      <div className="px-4">
        <h1 className="text-center font-bold text-blue-950 text-3xl m-4">
          Đặt phòng
        </h1>

        <form>
          <div className="max-w-[500px] mx-auto mt-10">
            <FormControl fullWidth></FormControl>
          </div>
        </form>
      </div>
    </>
  );
}
