import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginRequest } from "../../Api";
import { useAuthContext } from "../../contexts/Support";

export default function Login() {
  const { setCurrentUser, setUserToken } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    try {
      const response = await loginRequest({ email, password });

      if (response.data && response.data.user && response.data.token) {
        setCurrentUser(response.data.user);
        setUserToken(response.data.token);
      } else {
        throw new Error("Phản hồi không hợp lệ!");
      }
    } catch (error) {
      if (error.message === "The Provided credentials are not correct") {
        setError({ __html: "Thông tin đăng nhập không chính xác!" });
      } else {
        setError({ __html: error.message });
      }
    }
  };

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Xin chào 👋!
      </h2>
      <p className="text-center text- text-gray-600">
        Vui lòng đăng nhập để tiếp tục
      </p>

      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 mt-5 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Địa chỉ Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Địa chỉ email"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Mật khẩu"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Ghi nhớ tôi
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}
