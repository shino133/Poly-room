import { createBrowserRouter, Navigate } from "react-router-dom";
import { DefaultLayout, GuestLayout } from "./views/layouts/index";
import Login from "./views/Login";
import Signup from "./views/Signup";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/" />,
      },
      // {
      //   path: "/",
      //   element: <Dashboard />,
      // },
    ],
  },
]);

export default router;