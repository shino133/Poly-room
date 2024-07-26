import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/Support";
import { AppLogo } from "../../assets";

export default function GuestLayout() {
  const { userToken } = useAuthContext();

  if (userToken) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-[20vh] w-auto"
              src={AppLogo}
              alt="Your Company"
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
