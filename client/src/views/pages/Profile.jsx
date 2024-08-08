import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { changePassRequest } from "../../Api";
import { useAuthContext } from "../../contexts/Support";

function Profile() {
  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_new_password, setConfirm_new_password] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const { currentUser } = useAuthContext();

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (new_password !== confirm_new_password) {
      setSnackMsg("Mật khẩu mới và xác nhận mật khẩu không khớp");
      setSnackOpen(true);
      return;
    }
    try {
      const res = await changePassRequest({
        current_password,
        new_password,
      });
      setSnackMsg("Thay đổi mật khẩu thành công");
      setSnackOpen(true);
    } catch (error) {
      console.error("Error:", error);
      setSnackMsg("Thay đổi mật khẩu thất bại: " + error.message);
      setSnackOpen(true);
    }
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnack}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div className="min-w-[800px] mx-auto rounded-lg p-4 mt-24 border-2 border-white-600 bg-white">
      <h1 className="text-center font-bold text-blue-950 text-3xl mb-4">
         Hồ Sơ
      </h1>
      <form className="flex flex-col gap-4 text-black" onSubmit={onSubmit}>
        <TextField
          label="Tên"
          variant="outlined"
          fullWidth
          value={currentUser.name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={currentUser.email}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Mật khẩu hiện tại"
          variant="outlined"
          type="password"
          fullWidth
          value={current_password}
          onChange={(e) => setCurrent_password(e.target.value)}
        />
        <TextField
          label="Mật khẩu mới"
          variant="outlined"
          type="password"
          fullWidth
          value={new_password}
          onChange={(e) => setNew_password(e.target.value)}
        />
        <TextField
          label="Xác nhận mật khẩu mới"
          variant="outlined"
          type="password"
          fullWidth
          value={confirm_new_password}
          onChange={(e) => setConfirm_new_password(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#504b8e",
            marginTop: "1rem",
            marginBottom: "1.5rem",
            margin:"auto",
          }}
          className="w-1/6 m-auto  text-center font-bold text-blue-950 text-3xl "
        >
          Gửi
        </Button>
      </form>
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

export default Profile;
