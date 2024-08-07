import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [data, setData] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      email,
      password,
      rePassword,
    };

    console.log(formData);
  };

  return (
    <div className="max-w-[500px] mx-auto rounded-tl-md rounded-tr-md p-4 mt-24 border-2 border-black-600">
      <h1 className="text-center font-bold text-blue-950 text-3xl mb-4">
        User Form
      </h1>
      <form
        className="flex flex-col gap-4 text-black"
        onSubmit={onSubmit}
      >
        <TextField
          label="Name"
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
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Re-enter Password"
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
          className="mt-4"
        >
          Gửi
        </Button>
      </form>
    </div>
  );
}

export default User;
