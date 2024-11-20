import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import defaultAvatar from "/avatar.png";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  updateUserAvatar,
  updateUserInfo,
} from "../../../redux/slices/userSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  userInfo: {
    name: string;
    email: string;
    avatar: {
      url: string;
    };
  } | null;
};

const ProfileInfo: React.FC<Props> = ({ userInfo }) => {
  const [name, setName] = useState(userInfo?.name);
  const email = userInfo?.email;

  useEffect(() => {
    setName(userInfo?.name || "");
  }, [userInfo]);

  const dispatch = useAppDispatch();

  const { updateUserAvatarLoading, updateUserInfoLoading } = useAppSelector(
    (state) => state.user
  );

  const handleUpdateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Avatar = reader.result as string;

        const result = await dispatch(updateUserAvatar(base64Avatar));
        if (
          updateUserAvatar.fulfilled.match(result) &&
          result.payload?.success
        ) {
          window.location.reload();
        } else {
          console.log("Update avatar failed:", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      updateUserInfo({ name, email } as { name: string; email: string })
    );
    if (updateUserInfo.fulfilled.match(result) && result.payload?.success) {
      window.location.reload();
    } else {
      console.log("Update user info failed:", result);
    }
  };

  return (
    <div className="max-w-full w-full mx-auto px-6 pt-6 pb-12 bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
        My Account
      </h2>

      <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mt-6">
        <img
          src={userInfo?.avatar ? userInfo.avatar.url : defaultAvatar}
          alt="User Avatar"
          className="w-full h-full rounded-full border-2 border-blue-500 object-cover"
        />
        <label className="absolute bottom-3 right-3 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
          {updateUserAvatarLoading ? (
            <AiOutlineLoading3Quarters size={16} className="animate-spin" />
          ) : (
            <FaCamera size={16} />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpdateAvatar}
          />
        </label>
      </div>

      <div className="mt-8 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] mx-auto">
        <form className="space-y-6" onSubmit={handleSave}>
          <div>
            <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border-2 rounded-md text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={userInfo?.email}
              readOnly
              className="mt-1 w-full px-3 py-2 border-2 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            <div className="flex items-center justify-center gap-2">
              {updateUserInfoLoading && (
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              )}
              <span>Save</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
