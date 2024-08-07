import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signupRequest } from "../../Api";
import { useAuthContext } from "../../contexts/Support";

export default function Signup() {
  const { setCurrentUser, setUserToken } = useAuthContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [passwordError, setPasswordError] = useState("");
  const [confirmationError, setConfirmationError] = useState("");

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Mật khẩu phải có ít nhất 8 ký tự.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Mật khẩu phải chứa ít nhất một chữ cái viết hoa.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");
    }
    if (!/\d/.test(password)) {
      errors.push("Mật khẩu phải chứa ít nhất một chữ số.");
    }
    return errors.length === 0 ? null : errors;
  };

  const handlePasswordBlur = () => {
    const errors = validatePassword(password);
    if (errors) {
      setPasswordError(errors.join(" "));
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordConfirmationBlur = () => {
    if (password !== passwordConfirmation) {
      setConfirmationError("Mật khẩu xác nhận không khớp.");
    } else {
      setConfirmationError("");
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    setConfirmationError("");

    if (password !== passwordConfirmation) {
      setConfirmationError("Mật khẩu xác nhận không khớp.");
      return;
    }

    const errors = validatePassword(password);
    if (errors) {
      setError({ __html: errors.join(" ") });
      return;
    }

    try {
      const response = await signupRequest({
        name: fullName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.data && response.data.user && response.data.token) {
        setCurrentUser(response.data.user);
        setUserToken(response.data.token);
      } else {
        throw new Error("Định dạng phản hồi không hợp lệ");
      }
    } catch (error) {
      setError({ __html: error.response?.data?.message || error.message });
    }
  };

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Đăng ký tài khoản
      </h2>
      <p className="text-center text-gray-600">
        Hoặc{" "}
        <Link
          to="/login"
          className="font-medium text-orange-600 hover:text-orange-500"
        >
          đăng nhập
        </Link>
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
            <label htmlFor="full-name" className="sr-only">
              Họ và tên
            </label>
            <input
              id="full-name"
              name="name"
              type="text"
              required
              value={fullName}
              onChange={(ev) => setFullName(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              placeholder="Họ và tên"
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Địa chỉ email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
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
              onBlur={handlePasswordBlur}
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              placeholder="Mật khẩu"
            />
            {passwordError && (
              <div className="text-red-500 text-sm mt-1">{passwordError}</div>
            )}
          </div>

          <div>
            <label htmlFor="password-confirmation" className="sr-only">
              Xác nhận mật khẩu
            </label>
            <input
              id="password-confirmation"
              name="password_confirmation"
              type="password"
              required
              value={passwordConfirmation}
              onChange={(ev) => setPasswordConfirmation(ev.target.value)}
              onBlur={handlePasswordConfirmationBlur}
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              placeholder="Xác nhận mật khẩu"
            />

            {confirmationError && (
              <div className="text-red-500 text-sm mt-1">{confirmationError}</div>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            disabled={!!passwordError || !!confirmationError}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-orange-500 group-hover:text-orange-400"
                aria-hidden="true"
              />
            </span>
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
}
