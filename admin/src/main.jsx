import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./contexts";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
<<<<<<< Updated upstream
=======
import { StateProvider } from "./contexts/SidebarContext";
>>>>>>> Stashed changes

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
<<<<<<< Updated upstream
      <RouterProvider router={router} />
=======
      <StateProvider>
        <RouterProvider router={router} />
      </StateProvider>
>>>>>>> Stashed changes
    </AuthProvider>
  </React.StrictMode>
);
