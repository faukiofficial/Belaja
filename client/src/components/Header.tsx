import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import DarkModeToggle from "./DarkModeToggle";
import LoginModal from "./authComponent/LoginModal";
import RegisterModal from "./authComponent/RegisterModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import defaultAvatar from "/avatar.png";
import { FaAngleDown, FaAngleUp, FaSignOutAlt, FaUser } from "react-icons/fa";
import { logoutUser } from "../redux/slices/authSlice";
import { MdAdminPanelSettings } from "react-icons/md";

const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.user);

  console.log("userInfo", userInfo);

  const handleMenuClick = (name: string) => {
    setActiveItem(name);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    closeLoginModal();
  };
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result) && result.payload?.success) {
      setIsDropdownOpen(false);
      window.location.reload();
    } else {
      console.log("Logout failed:", result);
      setIsDropdownOpen(false);
    }
  };

  const getFirtsName = (name: string) => {
    const parts = name.split(" ");
    return parts[0];
  };

  return (
    <>
      <header className="font-Poppins text-base p-4 bg-slate-100 dark:bg-gray-900 flex items-center justify-between border-b border-gray-300 dark:border-gray-600 fixed top-0 left-0 right-0 z-20">
        <Link
          to="/"
          className="text-lg 400px:text-xl 800px:text-2xl text-black dark:text-white font-bold font-Josefin"
        >
          Belaja.
        </Link>

        <nav className="hidden 800px:flex items-center space-x-4 1000px:space-x-6">
          {navItemsData.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => handleMenuClick(item.name)}
              className={`text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white ${
                activeItem === item.name
                  ? "font-bold text-black dark:text-white"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3 600px:space-x-4">
          <DarkModeToggle />
          {userInfo ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={userInfo.avatar ? userInfo.avatar.url : defaultAvatar}
                  alt="avatar"
                  width={35}
                  height={35}
                  className="rounded-full border dark:bg-slate-100 bg-gray-400"
                />
                <span className="text-black dark:text-white hidden 600px:inline-block hover:text-slate-400">
                  Hai, {getFirtsName(userInfo.name || "")}
                </span>
                {isDropdownOpen ? (
                  <FaAngleUp className="text-black dark:text-white" />
                ) : (
                  <FaAngleDown className="text-black dark:text-white" />
                )}
              </div>

              {isDropdownOpen && (
                <div
                  className="h-full w-full fixed top-0 left-0 z-40"
                  onClick={toggleDropdown}
                >
                  <div className="absolute w-fit right-5 top-[50px] mt-2 min-w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
                    <Link
                      to="/profile/my-account"
                      className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaUser className="mr-2" /> Profile
                    </Link>
                    {userInfo.role ===
                      "admin" && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <MdAdminPanelSettings className="mr-2" /> Admin Dashboard
                        </Link>
                      )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 pl-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="text-black dark:text-white hidden 600px:inline-block underline hover:text-slate-400"
            >
              Login or Register
            </button>
          )}

          <button
            className="text-gray-700 dark:text-gray-300 800px:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <HiOutlineX size={24} />
            ) : (
              <HiOutlineMenu size={24} />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="h-screen w-full z-10 fixed top-16 left-0"
            onClick={toggleMobileMenu}
          >
            <div className="absolute right-0 w-full 600px:w-[80%] bg-slate-200 dark:bg-gray-700 p-4 flex flex-col items-center space-y-4 1000px:hidden z-20">
              {navItemsData.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  onClick={() => handleMenuClick(item.name)}
                  className={`text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white ${
                    activeItem === item.name
                      ? "font-bold text-black dark:text-white"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={openLoginModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Login or Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        openRegisterModal={openRegisterModal}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        openLoginModal={openLoginModal}
      />
    </>
  );
};

export default Header;
