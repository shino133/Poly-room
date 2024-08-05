import React, { useEffect, useState } from "react";
import {
  statusTranslations,
  roomTypeTranslations,
  roomTypeMap,
} from "../../constants";
import { getRoomDataPerPage, addRoom, deleteRoom, editRoom } from "../../Api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Delete,
  Edit,
  Skeleton,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  AddIcon,
  Snackbar,
  CloseIcon,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "../../constants/Mui";
import GeneralTable from "../../components/GeneralTable";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Room() {
  const [rooms, setRooms] = useState(null);
  const [page, setPage] = React.useState(0); // Zero-based index for TablePagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [roomIdToDelete, setRoomIdToDelete] = useState(null);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [roomType, setRoomType] = React.useState("");
  const [roomStatus, setRoomStatus] = React.useState("");
  const [roomCode, setRoomCode] = React.useState("");
  const [snackMsg, setSnackMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [roomIdToUpdate, setRoomIdToUpdate] = useState(null);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setRoomIdToDelete(null);
  };

  const getData = () => {
    getRoomDataPerPage(rowsPerPage, page + 1) // Convert to one-based index for API
      .then(({ data }) => {
        setRooms(data);
        console.log("rooms", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [rowsPerPage, page, snackOpen]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const handleDelete = async () => {
    try {
      await deleteRoom(roomIdToDelete);
      setRooms((prevRooms) => ({
        ...prevRooms,
        data: prevRooms.data.filter((room) => room.id !== roomIdToDelete),
      }));
      handleClose();
      setSnackMsg("Xóa phòng thành công!");
      setSnackOpen(true);
    } catch (error) {
      console.error("Failed to delete room:", error);
      if (error.response.data.errors) {
        handleClose();
        setSnackMsg(
          "Xóa phòng thất bại. Lỗi: " +
            error.response.data.errors[
              Object.keys(error.response.data.errors)[0]
            ]
        );
        setSnackOpen(true);
      } else {
        handleClose();
        setSnackMsg("Xóa phòng thất bại. Lỗi: " + error.response.data.error);
        setSnackOpen(true);
      }
    }
  };

  const handleClickOpen = (id) => {
    setRoomIdToDelete(id);
    setOpen(true);
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

  const handleOpenAddDialog = () => {
    setIsEditing(false);
    setRoomCode("");
    setRoomType("");
    setRoomStatus("");
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleChangeRoomType = (event) => {
    setRoomType(event.target.value);
  };

  const handleChangeRoomStatus = (event) => {
    setRoomStatus(event.target.value);
  };

  const handleAddRoom = async () => {
    const data = new FormData();
    data.append("code", roomCode);
    data.append("room_child_id", roomType);
    data.append("status", roomStatus);

    try {
      await addRoom(data);
      setSnackMsg("Thêm phòng thành công!");
      setSnackOpen(true);
      handleCloseAddDialog();
      setRoomCode("");
      setRoomType("");
      setRoomStatus("");
    } catch (error) {
      handleCloseAddDialog();
      setSnackMsg(
        "Lỗi: " +
          error.response.data.errors[Object.keys(error.response.data.errors)[0]]
      );
      setSnackOpen(true);
      console.error("Error:", error);
    }
  };

  const handleEditRoom = (room) => {
    setIsEditing(true);
    setRoomCode(room.code);
    setRoomType(roomTypeMap[room.type] || room.type);
    setRoomStatus(room.status);
    setRoomIdToUpdate(room.id);
    setAddDialogOpen(true);
  };

  const handleChangeRoomCode = (event) => {
    setRoomCode(event.target.value);
  };

  const _editRoom = async () => {
    const data = {
      code: roomCode,
      room_child_id: roomType,
      status: roomStatus,
    };

    const urlEncodedData = new URLSearchParams();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        urlEncodedData.append(key, data[key]);
      }
    }

    try {
      await editRoom(roomIdToUpdate, data);
      console.log("roomid", roomIdToUpdate);
      console.log("data312", data);
      handleCloseAddDialog();
      setRoomCode("");
      setRoomType("");
      setRoomStatus("");
      setSnackMsg("Cập nhật phòng thành công!");
      setSnackOpen(true);
    } catch (error) {
      handleCloseAddDialog();
      setSnackMsg("Lỗi: " + error);
      setSnackOpen(true);
      console.error("Error321:", error);
    }
  };

  const headers = [
    "ID",
    "Mã phòng",
    "Thể loại phòng",
    "Trạng thái",
    "Thao tác",
  ];

  return (
    <div className="relative">
      <h1 className="text-center font-bold text-blue-950 text-3xl m-4">
        Quản lý phòng
      </h1>
      <div className="absolute left-4 top-0">
        <IconButton onClick={getData} style={{ backgroundColor: "#f5f5f5" }}>
          <RefreshIcon />
        </IconButton>
      </div>
      <div className="absolute right-4 top-0">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#504b8e",
          }}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
          onClick={handleOpenAddDialog}
        >
          <span className="mt-[3px]">Thêm phòng</span>
          <AddIcon />
        </Button>
      </div>
      <GeneralTable
        headers={headers}
        data={rooms?.data}
        paginationTotalCount={rooms?.pagination.total}
        handleEditRow={handleEditRoom}
        handleClickOpen={handleClickOpen}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="Số phòng mỗi trang"
        tableRowsLoaderRows={10}
        tableRowsLoaderColumns={5}
        roomTypeTranslations={roomTypeTranslations}
        statusTranslations={statusTranslations}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xóa phòng khỏi hệ thống?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thao tác này sẽ xóa phòng khỏi hệ thống. Bạn có chắc chắn muốn tiếp
            tục?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleDelete} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={addDialogOpen}
        onClose={handleCloseAddDialog}
      >
        <DialogTitle>{isEditing ? "Cập nhật phòng" : "Thêm phòng"}</DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" fullWidth margin="normal">
            <TextField
              value={roomCode}
              onChange={handleChangeRoomCode}
              label="Mã phòng"
              variant="outlined"
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">
              Thể loại phòng
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={roomType}
              label="Thể loại phòng"
              onChange={handleChangeRoomType}
            >
              <MenuItem value={1}>Phòng họp</MenuItem>
              <MenuItem value={2}>Văn phòng</MenuItem>
              <MenuItem value={4}>Phòng học</MenuItem>
              <MenuItem value={5}>Phòng tự học</MenuItem>
              <MenuItem value={-1}>Khác</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={roomStatus}
              label="Trạng thái"
              onChange={handleChangeRoomStatus}
            >
              <MenuItem value={"Available"}>Có sẵn</MenuItem>
              <MenuItem value={"Occupied"}>Đã có người</MenuItem>
              <MenuItem value={"Maintenance"}>Bảo trì</MenuItem>
              <MenuItem value={"Cleaning"}>Đang dọn dẹp</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Hủy bỏ</Button>
          <Button onClick={isEditing ? _editRoom : handleAddRoom}>
            {isEditing ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message={snackMsg}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}
