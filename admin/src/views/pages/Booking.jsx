import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getRoomData } from "../../Api";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export default function Booking() {
  const [roomCode, setRoomCode] = useState("");
  // const [userCode, setUserCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [rooms, setRooms] = useState(null);
  const [options, setOptions] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);

  const fetchRoomData = async () => {
    try {
      const { data } = await getRoomData();
      console.log("rooms", data);

      // if options const is empty array then return;
      if (options.length > 0) {
        // options is an empty array
        return;
      }

      // Ensure rooms is not null or undefined before mapping
      const formattedOptions = data?.data.map((room) => ({
        label: room.code,
        value: room.id,
      }));
      console.log("formattedOptions", formattedOptions);
      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  return (
    <>
      <div className="px-4">
        <h1 className="text-center font-bold text-blue-950 text-3xl m-4">
          Đặt phòng
        </h1>

        <form>
          <div className="max-w-[500px] mx-auto mt-10">
            <Autocomplete
              disablePortal
              options={options}
              fullWidth={true}
              renderInput={(params) => (
                <TextField {...params} label="Mã phòng" />
              )}
              noOptionsText="Đang tải dữ liệu..."
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker label="Giờ bắt đầu" />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker label="Giờ kết thúc" />
              </DemoContainer>
            </LocalizationProvider>
            <FormControl fullWidth>
              <TextField
                label="Ghi chú"
                style={{ marginTop: 8 }}
                variant="outlined"
              />
            </FormControl>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#504b8e",
                marginTop: "1rem",
              }}
            >
              Đặt phòng
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
