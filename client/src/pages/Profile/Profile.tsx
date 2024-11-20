import React from "react";
import Header from "../../components/Header";
import ProfileSidebar from "./components/ProfileSidebar";
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

const Profile: React.FC<Props> = ({ userInfo }) => {
    
  return (
    <div className="bg-slate-100 dark:bg-gray-900 font-Poppins min-h-[calc(100vh-30px)]">
      <div className="max-w-[85%] mx-auto ">
        <Header />
        <div className="mt-[30px] py-[70px] flex gap-3 800px:gap-10 flex-col items-center 800px:items-start 800px:flex-row justify-between text-black dark:text-white">
          <ProfileSidebar userInfo={userInfo}/>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
