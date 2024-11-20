import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import DashboardHero from "./components/DashboardHero";
import { Outlet } from "react-router-dom";

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

const Admin: React.FC<Props> = ({ userInfo }) => {
  return (
    <div className="bg-slate-100 dark:bg-gray-900 font-Poppins">
      <div className="flex min-h-[100vh] text-black dark:text-white">
        <div className="min-w-[250px]">
          <AdminSidebar userInfo={userInfo} />
        </div>
        <div className="w-full">
          <DashboardHero />
          <div className="mt-[70px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
