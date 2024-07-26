import { createBrowserRouter, Navigate } from "react-router-dom";
import { DefaultLayout, GuestLayout } from "./views/layouts";
import {
  Dashboard,
  Booking,
  User,
  Room,
  History,
  Schedule,
  Login,
  Signup,
  Statistic,
} from "./views/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/book-room",
        element: <Booking />,
      },
      {
        path: "/manage-rooms",
        element: <Room />,
      },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/statistics",
        element: <Statistic />,
      },
    ],
  },
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
]);

export default router;
