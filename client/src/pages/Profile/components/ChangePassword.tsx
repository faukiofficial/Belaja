import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  updateUserPassword,
} from "../../../redux/slices/userSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import toast from "react-hot-toast";


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const dispatch = useAppDispatch();

  const { updateUserPasswordLoading } = useAppSelector((state) => state.user);

    const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();

      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }

      const result = await dispatch(
        updateUserPassword({ oldPassword, newPassword } as { oldPassword: string; newPassword: string })
      );
      if (updateUserPassword.fulfilled.match(result) && result.payload?.success) {
        // window.location.reload();
      } else {
        console.log("Update user info failed:", result);
      }
    };

  return (
    <div className="max-w-full w-full mx-auto px-6 pt-6 pb-12 bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl md:text-3xl">
        Change Password
      </h2>

      <div className="mt-8 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] mx-auto">
        <form className="space-y-6" onSubmit={handleSave}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
              Old Password
            </label>
            <div className="relative">
              <input
                type={isOldPasswordVisible ? "text" : "password"}
                id="old-password"
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
              >
                {isOldPasswordVisible ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
              New Password
            </label>
            <div className="relative">
              <input
                type={isNewPasswordVisible ? "text" : "password"}
                id="new-password"
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
              >
                {isNewPasswordVisible ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="confirm-password"
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
              >
                {isConfirmPasswordVisible ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 text-sm sm:text-base md:text-lg"
          >
            <div className="flex items-center justify-center gap-2">
              {updateUserPasswordLoading ? (
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              ) : (
                ""
              )}{" "}
              <span>Save</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
