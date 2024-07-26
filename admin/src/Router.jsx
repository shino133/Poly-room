import { createBrowserRouter, Navigate } from "react-router-dom";
import { DefaultLayout , GuestLayout } from "./views/layouts";
import { Dashboard, Login } from "./views/pages";
import { Signup } from "./views/pages";

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
