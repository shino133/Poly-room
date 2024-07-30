import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { Skeleton } from "@mui/material";
import { getUserData, addUser, deleteUser, editUser } from "../../Api";
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
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GeneralTable from "../../components/GeneralTable";

export default function User() {
  const [users, setUsers] = useState(null);
  const [page, setPage] = React.useState(0); // Zero-based index for TablePagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [snackMsg, setSnackMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setUserIdToDelete(null);
  };

  useEffect(() => {
    getUserData(rowsPerPage, page + 1)
      .then(({ data }) => {
        setUsers(data);
        console.log("users", data);
      })
      .catch((error) => {
        console.log(error);
      });
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
      await deleteUser(userIdToDelete);
      setUsers((prevUsers) => ({
        ...prevUsers,
        data: prevUsers.data.filter((user) => user.id !== userIdToDelete),
      }));
      handleClose();
      setSnackMsg("Xóa người dùng thành công!");
      setSnackOpen(true);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleClickOpen = (id) => {
    setUserIdToDelete(id);
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
    // empty the fields
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAddUser = async () => {
    const data = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    const urlEncodedData = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        urlEncodedData.append(key, data[key]);
      }
    }

    try {
      await addUser(data);
      setSnackMsg("Thêm người dùng thành công!");
      setSnackOpen(true);
      handleCloseAddDialog();
      // empty the fields
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      handleCloseAddDialog();
      if (error.response.status === 422) {
        setSnackMsg(
          "Lỗi: " +
            error.response.data.errors[
              Object.keys(error.response.data.errors)[0]
            ]
        );
      } else {
        setSnackMsg("Lỗi: " + error);
      }
      setSnackOpen(true);
      console.error("Error:", error);
    }
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    // set the fields
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setPasswordConfirmation("");
    setUserIdToUpdate(user.id);
    setAddDialogOpen(true);
  };

  const _editUser = async () => {
    const data = {
      name,
      email,
    };

    if (password) {
      data.password = password;
    }

    if (passwordConfirmation) {
      data.password_confirmation = passwordConfirmation;
    }

    const urlEncodedData = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        urlEncodedData.append(key, data[key]);
      }
    }

    try {
      await editUser(userIdToUpdate, data);
      console.log("userid", userIdToUpdate);
      console.log("data312", data);
      handleCloseAddDialog();
      // empty the fields
      setSnackMsg("Cập nhật người dùng thành công!");
      setSnackOpen(true);
    } catch (error) {
      handleCloseAddDialog();
      if (error.response.status === 422) {
        setSnackMsg(
          "Lỗi: " +
            error.response.data.errors[
              Object.keys(error.response.data.errors)[0]
            ]
        );
      } else {
        setSnackMsg("Lỗi: " + error);
      }
      setSnackOpen(true);
      console.error("Error321:", error);
    }
  };

  const headers = ["ID", "Tên", "Email", "Thao tác"];

  return (
    <div className="relative">
      <h1 className="text-center font-bold text-blue-950 text-3xl m-4">
        Quản lý người dùng
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
          <span className="mt-[3px]">Thêm người dùng</span>
          <AddIcon />
        </Button>
      </div>
      <GeneralTable
        headers={headers}
        data={users?.data}
        paginationTotalCount={users?.pagination.total}
        handleEditRow={handleEditUser}
        handleClickOpen={handleClickOpen}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="Số người dùng mỗi trang"
        tableRowsLoaderRows={10}
        tableRowsLoaderColumns={4}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xóa người dùng khỏi hệ thống?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thao tác này sẽ xóa người dùng khỏi hệ thống. Bạn có chắc chắn muốn
            tiếp tục?
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
        <DialogTitle>
          {isEditing ? "Cập nhật người dùng" : "Thêm người dùng"}
        </DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" fullWidth margin="normal">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Tên"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              type="email"
              required
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">
              {isEditing ? "Mật khẩu mới" : "Mật khẩu *"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={isEditing ? "Mật khẩu mới" : "Mật khẩu"}
              required={!isEditing}
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">
              {isEditing ? "Nhập lại mật khẩu" : "Nhập lại mật khẩu *"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword2 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              label="Nhập lại mật khẩu"
              required={!isEditing}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Hủy bỏ</Button>
          <Button onClick={isEditing ? _editUser : handleAddUser}>
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
