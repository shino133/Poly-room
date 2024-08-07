import React, { useState, useEffect } from "react";
import { getRoomData, bookRoom } from "../../Api";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormBooking from "../../components/FormBooking";

export default function Booking() {
  const [roomCode, setRoomCode] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [note, setNote] = useState("");
  const [options, setOptions] = useState([]);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

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

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const handleRoomIdChange = (event, newValue) => {
    setRoomCode(newValue);
  };

  const handleBookRoom = () => {
    // create formdata
    const formData = new FormData();
    formData.append("room_id", roomCode.value);
    formData.append("start_at", startTime);
    formData.append("end_at", endTime);
    formData.append("note", note);

    // call bookRoom API
    bookRoom(formData)
      .then(() => {
        setSnackMsg("Đặt phòng thành công");
        setSnackOpen(true);
      })
      .catch((error) => {
        console.error("Error booking room:", error);
        setSnackMsg(
          "Đặt phòng thất bại. Lỗi: " +
            error.response.data.errors[
              Object.keys(error.response.data.errors)[0]
            ]
        );
        setSnackOpen(true);
      });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <div className="min-w-[800px] mx-auto rounded-lg p-4 mt-24 border-2 border-white-600 bg-white">
        <h1 className="text-center font-bold text-blue-950 text-3xl m-4">
          Đặt phòng
        </h1>
        <FormBooking
          options={options}
          roomCode={roomCode}
          startTime={startTime}
          endTime={endTime}
          note={note}
          handleStartTimeChange={handleStartTimeChange}
          handleEndTimeChange={handleEndTimeChange}
          handleBookRoom={handleBookRoom}
          handleNoteChange={handleNoteChange}
          handleRoomIdChange={handleRoomIdChange}
        />
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          message={snackMsg}
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </div>
    </>
  );
}
