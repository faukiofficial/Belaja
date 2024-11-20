import { useState } from "react";
import { FaBell } from "react-icons/fa";
import DarkModeToggle from "../../../components/DarkModeToggle";


const DashboardHeader = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New message",
      message: "New message from Admin",
      isRead: false,
    },
    {
      id: 2,
      title: "New course",
      message: "New course available",
      isRead: false,
    },
    {
      id: 3,
      title: "System maintenance",
      message: "System maintenance",
      isRead: false,
    },
  ]);

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  return (
    <div className="flex justify-end items-center px-6 py-2 bg-gray-100 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10 border-b shadow-md">
      <div className="flex items-center space-x-4">
        <DarkModeToggle />

        <div className="relative">
          <FaBell
            className="text-2xl text-black dark:text-white cursor-pointer"
            onClick={toggleNotifications}
          />
          <span className="absolute top-3 left-4 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>

          {isNotificationsOpen && (
            <div className="h-full w-full fixed top-0 left-0 z-40" onClick={toggleNotifications}>
              <div className="absolute top-10 right-5 z-100 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-md w-80 p-2" onClick={(e) => e.stopPropagation()}>
              <ul className="space-y-2">
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className={`flex items-start text-sm p-2 rounded-md cursor-pointer bg-gray-100 dark:bg-gray-600 ${
                      notif.isRead
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-black dark:text-white"
                    } hover:bg-gray-300 dark:hover:bg-gray-700`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    {!notif.isRead && (
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></div>
                    )}
                    <div className="flex flex-col w-full">
                      <span className="">{notif.title}</span>
                      <span className="text-xs">{notif.message}</span>
                      <span className="text-[11px] text-end">just now</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
