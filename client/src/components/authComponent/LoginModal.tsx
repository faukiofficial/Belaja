import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser, selectAuthState } from "../../redux/slices/authSlice";
import GoogleOAuth from "./GoogleOAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  openRegisterModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  openRegisterModal,
}) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result) && result.payload?.success) {
      onClose();
      window.location.reload();
    } else {
      console.log("Login failed:", result);
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] 600px:w-[450px] 800px:w-[500px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 600px:p-6 outline-none font-Poppins">
        <h2 className="text-lg 800px:text-xl font-bold mb-6 800px:mb-8 dark:text-white">
          Login
        </h2>
        <form className="space-y-5 800px:space-y-7" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm 800px:text-base text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm 800px:text-base text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
              >
                {isPasswordVisible ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 600px:py-3 rounded hover:bg-blue-600"
            disabled={authState.loginLoading}
          >
            {authState.loginLoading ? "Logging in..." : "Login"}
          </button>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <GoogleOAuth onClose={onClose} />
          </div>

          <p className="text-center text-xs 600px:text-sm mt-4 text-black dark:text-white">
            Don't have an account?{" "}
            <span
              onClick={openRegisterModal}
              className="text-blue-500 font-semibold hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
