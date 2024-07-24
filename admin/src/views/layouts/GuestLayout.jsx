import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ProviderContext";

export default function GuestLayout() {
  const { userToken } = useStateContext();

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
              src="/peng_survey.svg"
              alt="Your Company"
            />
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}