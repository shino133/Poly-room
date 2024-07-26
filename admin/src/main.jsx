import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider, StateProvider } from "./contexts";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { SidebarProvider } from "./contexts/SidebarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <StateProvider>
        <RouterProvider router={router} />
      </StateProvider>
    </AuthProvider>
  </React.StrictMode>
);
