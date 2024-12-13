import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaPlus,
  FaCogs,
  FaUsersCog,
  FaSignOutAlt,
  // FaChevronUp,
  // FaChevronDown,
} from "react-icons/fa";
import { Avatar } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { logoutUser } from "../../../redux/slices/authSlice";

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

const AdminSidebar: React.FC<Props> = ({ userInfo }) => {
  const dispatch = useAppDispatch();

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubMenuToggle = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  // const isPathActive = (paths: string[]) => paths.includes(location.pathname);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result) && result.payload?.success) {
      window.location.reload();
    } else {
      console.log("Logout failed:", result);
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const handleMouseLeave = () => {
    document.body.style.overflowY = "auto";
  };

  return (
    <div
      className={`fixed top-0 left-0 z-20 h-screen bg-gray-50 dark:bg-gray-800 shadow-lg w-[250px] overflow-y-auto pb-10`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-center p-4 mt-2">
        <Avatar
          alt={userInfo?.name}
          src={userInfo?.avatar?.url}
          sx={{ width: 80, height: 80 }}
        />
        <Link
          to="/profile/my-account"
          className="mt-2 text-lg underline cursor-pointer"
        >
          {userInfo?.name}
        </Link>
        <span className="text-xs p-1 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full">
          {userInfo?.role}
        </span>
      </div>

      <nav className="flex flex-col mt-4 gap-2">
        <NavLink
          to="dashboard"
          className="flex items-center px-4 py-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
        >
          <FaChartPie className="mr-2" />
          <span>Dashboard</span>
        </NavLink>

        <div>
          <button
            onClick={() => handleSubMenuToggle("Data")}
            className={`flex items-center justify-between px-4 py-2 w-full text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <NavLink to="users" className="flex items-center">
              <FaUsers className="mr-2" />
              <span>Data</span>
            </NavLink>
            {/* {openSubMenu === "Data" ||
            isPathActive(["/admin/users", "/admin/orders"]) ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )} */}
          </button>

          {/* {(openSubMenu === "Data" ||
            isPathActive(["/admin/users", "/admin/orders"])) && ( */}
            <div className="ml-8">
              <NavLink
                to="users"
                className={({ isActive }) =>
                  `block py-2 text-sm hover:underline ${
                    isActive ? "text-[#2563eb] dark:text-[#3b82f6]" : ""
                  }`
                }
                onClick={() => handleSubMenuToggle("Data")}
              >
                Users
              </NavLink>
              <NavLink
                to="orders"
                className={({ isActive }) =>
                  `block py-2 text-sm hover:underline ${
                    isActive ? "text-[#2563eb] dark:text-[#3b82f6]" : ""
                  }`
                }
                onClick={() => handleSubMenuToggle("Data")}
              >
                Orders
              </NavLink>
            </div>
          {/* )} */}
        </div>

        <div>
          <button
            onClick={() => handleSubMenuToggle("Content")}
            className="flex items-center justify-between px-4 py-2 w-full text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <NavLink to="courses" className="flex items-center">
              <FaPlus className="mr-2" />
              <span>Content</span>
            </NavLink>
            {/* {openSubMenu === "Content" ||
            isPathActive(["/admin/create-course", "/admin/courses"]) ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )} */}
          </button>
          {/* {(openSubMenu === "Content" ||
            isPathActive(["/admin/create-course", "/admin/courses"])) && ( */}
            <div className="ml-8">
              <NavLink
                to="courses"
                className={({ isActive }) =>
                  `block py-2 text-sm hover:underline ${
                    isActive ? "text-[#2563eb] dark:text-[#3b82f6]" : ""
                  }`
                }
                onClick={() => handleSubMenuToggle("Content")}
              >
                Courses
              </NavLink>
              <NavLink
                to="create-course"
                className={({ isActive }) =>
                  `block py-2 text-sm hover:underline ${
                    isActive ? "text-[#2563eb] dark:text-[#3b82f6]" : ""
                  }`
                }
                onClick={() => handleSubMenuToggle("Content")}
              >
                Create Course
              </NavLink>
            </div>
          {/* )} */}
        </div>

        <NavLink
          to="manage-team"
          className="flex items-center px-4 py-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
        >
          <FaUsersCog className="mr-2" />
          <span>Manage Team</span>
        </NavLink>

        <NavLink
          to="settings"
          className="flex items-center px-4 py-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
        >
          <FaCogs className="mr-2" />
          <span>Settings</span>
        </NavLink>

        <div
          onClick={handleLogout}
          className="flex items-center px-4 py-2 mt-auto text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          <FaSignOutAlt className="mr-2" />
          <span>Logout</span>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
