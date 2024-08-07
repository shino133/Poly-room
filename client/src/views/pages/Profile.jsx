import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { changePassRequest } from "../../Api";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await changePassRequest({
        password,
        rePassword,
      });
      console.log(res);
      const formData = {
        name,
        email,
        password,
        rePassword,
      };
      console.log(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-w-[800px] mx-auto rounded-lg p-4 mt-24 border-2 border-white-600 bg-white">
      <h1 className="text-center font-bold text-blue-950 text-3xl mb-4">
        Form Hồ Sơ
      </h1>
      <form
        className="flex flex-col gap-4 text-black"
        onSubmit={onSubmit}
      >
        <TextField
          label="Tên"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mật khẩu"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Nhập lại mật khẩu"
          variant="outlined"
          type="password"
          fullWidth
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-12 text-center font-bold text-blue-950 text-3xl m-4"
        >
          Gửi
        </Button>
      </form>
    </div>
  );
}

export default Profile;
