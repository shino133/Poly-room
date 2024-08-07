import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useState } from "react";

export default function FormBooking({
  options,
  roomCode,
  startTime,
  endTime,
  note,
  handleBookRoom,
  handleRoomIdChange,
  handleStartTimeChange,
  handleEndTimeChange,
  handleNoteChange,
}) {
    return (
    <form class="max-w-[500px] mx-auto bg-white">
      <div className="max-w-[500px] mx-auto mt-10">
        <Autocomplete
          disablePortal
          options={options}
          getOptionKey={(option) => option.key}
          fullWidth={true}
          value={roomCode}
          onChange={handleRoomIdChange}
          renderInput={(params) => <TextField {...params} label="Mã phòng"  
          style={{backgroundColor: 'rgba(255,255,255)'}}
          />}
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
            onChange={handleNoteChange}
            style={{ marginTop: 8 }}
            variant="outlined"
          />
        </FormControl>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#504b8e",
            marginTop: "1rem",
            marginBottom: "1.5rem",
          }}
          onClick={handleBookRoom}
        >
          Đặt phòng
        </Button>
      </div>
    </form>
  );
}
