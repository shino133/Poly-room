import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import {
  statusTranslations,
  roomTypeTranslations,
  roomType,
} from "../Constants";
import TablePagination from "@mui/material/TablePagination";
import { getRoomDataPerPage, addRoom, deleteRoom } from "../../Api";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

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

  useEffect(() => {
    getRoomDataPerPage(rowsPerPage, page + 1) // Convert to one-based index for API
      .then(({ data }) => {
        setRooms(data);
        console.log("rooms", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rowsPerPage, page, snackMsg]);

  const TableRowsLoader = ({ rowsNum }) => {
    return [...Array(rowsNum)].map((row, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      </TableRow>
    ));
  };

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
      setSnackMsg("Lỗi: " + error);
      setSnackOpen(true);
      console.error("Error:", error);
    }
  };

  const handleEditRoom = (room) => {
    setRoomCode(room.code);
    setRoomType(roomType[room.type]);
    setRoomStatus(room.status);
    setIsEditing(true);
    handleOpenAddDialog();
  };

  const handleChangeRoomCode = (event) => {
    setRoomCode(event.target.value);
  };

  return (
    <div className="relative">
      <h1 className="text-center font-bold text-blue-950 text-3xl m-4">
        Quản lý phòng
      </h1>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Mã phòng</TableCell>
              <TableCell>Thể loại phòng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!rooms ? (
              <TableRowsLoader rowsNum={15} />
            ) : (
              rooms.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>
                    {roomTypeTranslations[row.type] || row.type}
                  </TableCell>
                  <TableCell>
                    {statusTranslations[row.status] || row.status}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditRoom(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleClickOpen(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rooms?.pagination.total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Số phòng mỗi trang"}
        labelDisplayedRows={({ from, to, count }) => {
          return "" + from + "-" + to + " của " + count;
        }}
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
          <Button onClick={handleAddRoom}>
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
      />
    </div>
  );
}
