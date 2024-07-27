import { createBrowserRouter, Navigate } from "react-router-dom";
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
  DefaultLayout,
  GuestLayout,
} from "./views";

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
