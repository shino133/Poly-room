import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getRoomData, bookRoom } from "../../Api";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { errorTranslations } from "../../constants";

export default function Booking() {
  const [roomCode, setRoomCode] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [note, setNote] = useState("");
  const [options, setOptions] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

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
        key: room.id,
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

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue ? dayjs(newValue).format("YYYY-MM-DDTHH:mm") : null);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue ? dayjs(newValue).format("YYYY-MM-DDTHH:mm") : null);
  };

  const handleBookRoom = () => {
    // create formdata
    const formData = new FormData();
    formData.append("room_id", roomCode?.value);
    formData.append("start_at", startTime);
    formData.append("end_at", endTime);
    formData.append("note", note);

    // call bookRoom API
    bookRoom(formData)
      .then(() => {
        enqueueSnackbar("Đặt phòng thành công!", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error booking room:", error);
        if (error.response.data.errors) {
          enqueueSnackbar(
            "Đặt phòng thất bại. Lỗi: " +
              errorTranslations[
                error.response.data.errors[
                  Object.keys(error.response.data.errors)[0]
                ]
              ] ||
              error.response.data.errors[
                Object.keys(error.response.data.errors)[0]
              ],
            { variant: "error" }
          );
        } else {
          enqueueSnackbar(
            "Đặt phòng thất bại. Lỗi: " +
              errorTranslations[error.response.data.error] ||
              error.response.data.error,
            { variant: "error" }
          );
        }
        setSnackOpen(true);
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
            <Autocomplete
              disablePortal
              options={options}
              getOptionKey={(option) => option.key}
              fullWidth={true}
              value={roomCode}
              onChange={(event, newValue) => {
                setRoomCode(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Mã phòng" />
              )}
              noOptionsText="Đang tải dữ liệu..."
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Giờ bắt đầu"
                  value={startTime ? dayjs(startTime) : null}
                  onChange={handleStartTimeChange}
                  format="DD/MM/YYYY HH:mm"
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Giờ kết thúc"
                  value={endTime ? dayjs(endTime) : null}
                  onChange={handleEndTimeChange}
                  format="DD/MM/YYYY HH:mm"
                />
              </DemoContainer>
            </LocalizationProvider>
            <FormControl fullWidth>
              <TextField
                label="Ghi chú"
                value={note}
                onChange={(e) => setNote(e.target.value)}
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
              onClick={handleBookRoom}
            >
              Đặt phòng
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
