import React from "react";
import { FaUserAlt, FaBook, FaLock, FaSignOutAlt } from "react-icons/fa";
import { useAppDispatch } from "../../../redux/hooks";
import { logoutUser } from "../../../redux/slices/authSlice";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

type Props = {
  userInfo: {
    name: string;
    email: string;
    avatar: {
      url: string;
    };
    role: string;
  } | null;
};

const ProfileSidebar: React.FC<Props> = ({ userInfo }) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result) && result.payload?.success) {
      window.location.reload();
    } else {
      console.log("Logout failed:", result);
    }
  };

  const getFirtsName = (name: string) => {
    const parts = name.split(" ");
    return parts[0];
  };

  return (
    <div className="w-fit h-fit p-2 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-600">
      <div className="text-lg p-3 font-semibold mb-6 text-gray-800 dark:text-white hidden 800px:block">
        {getFirtsName(userInfo?.name || "")}'s Profile
      </div>
      <div className="flex flex-row 800px:flex-col items-center 800px:items-start space-x-10 800px:space-x-0 800px:space-y-2">
        <NavLink
          to="my-account"
          className={({ isActive }) => `flex items-center p-2 w-full rounded space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer ${
            isActive ? "bg-[#c0c8d8] dark:bg-[#2c4577]" : ""
          }`}
        >
          <FaUserAlt />
          <span className="hidden 800px:block whitespace-nowrap w-fit">
            My Account
          </span>
        </NavLink>
        <NavLink
          to="enrolled-courses"
          className={({ isActive }) => `flex items-center p-2 w-full rounded space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer ${
            isActive ? "bg-[#c0c8d8] dark:bg-[#2c4577]" : ""
          }`}
        >
          <FaBook />
          <span className="hidden 800px:block whitespace-nowrap w-fit">
            Enrolled Courses
          </span>
        </NavLink>
        <NavLink
          to="password"
          className={({ isActive }) => `flex items-center p-2 w-full rounded space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer ${
            isActive ? "bg-[#c0c8d8] dark:bg-[#2c4577]" : ""
          }`}
        >
          <FaLock />
          <span className="hidden 800px:block whitespace-nowrap w-fit">
            Change Password
          </span>
        </NavLink>
        {userInfo?.role === "admin" && (
          <Link
            to={"/admin/dashboard"}
            className="flex items-center space-x-2 p-2 w-full rounded text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer"
          >
            <MdAdminPanelSettings className="text-xl" />
            <span className="hidden 800px:block whitespace-nowrap w-fit">
              Admin Dashboard
            </span>
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 pl-3 w-full rounded text-red-500 hover:text-red-600 dark:hover:text-red-400"
        >
          <FaSignOutAlt />
          <span className="hidden 800px:block whitespace-nowrap w-fit">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
