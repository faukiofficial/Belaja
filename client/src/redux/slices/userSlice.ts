import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_SERVER_URI;

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: {
    public_id: string;
    url: string;
  };
  isVerified: boolean;
  createdAt: string;
  courses: [];
}

interface IUserState {
  user: IUser[];
  users: IUser[];
  userInfo: IUser | null;
  getUserInfoLoading: boolean;
  getAllUsersLoading: boolean;
  deleteUserByAdminLoading: boolean;
  updateUserRoleByAdminLoading: boolean;
  updateUserAvatarLoading: boolean;
  updateUserInfoLoading: boolean;
  updateUserPasswordLoading: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: [],
  users: [],
  userInfo: null,
  getUserInfoLoading: true,
  getAllUsersLoading: false,
  updateUserAvatarLoading: false,
  updateUserInfoLoading: false,
  updateUserPasswordLoading: false,
  deleteUserByAdminLoading: false,
  updateUserRoleByAdminLoading: false,
  loading: false,
  error: null,
};

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const response = await axios.get(`${apiUrl}/get-users`, {
      withCredentials: true,
    });
    if (response.data.success) {
      return response.data;
    } else if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
});

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  try {
    const response = await axios.get(`${apiUrl}/me`, {
      withCredentials: true,
    });
    if (response.data.success) {
      return response.data;
    } else if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
});

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (avatar: string) => {
    try {
      const response = await axios.put(
        `${apiUrl}/update-user-avatar`,
        { avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        return response.data;
      } else if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async ({ name, email }: { name: string; email: string }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/update-user-info`,
        { name, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      throw new Error(error as string);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    console.log({ oldPassword, newPassword });
    try {
      const response = await axios.put(
        `${apiUrl}/update-user-password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        window.location.reload();
        return response.data;
      } else if (response.data.succes === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Change password failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during change password.");
      }
      throw error;
    }
  }
);

export const deleteUserByAdmin = createAsyncThunk(
  "user/deleteUserByAdmin",
  async (userId: string) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/delete-user/${userId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Delete user failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during delete user.");
      }
    }
  }
);

export const updateUserRoleByAdmin = createAsyncThunk(
  "user/updateUserRoleByAdmin",
  async ({ email, role }: { email: string; role: string }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/update-user-role`, { email, role },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("User role updated successfully");
        return response.data;
      } else if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Update user role failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during update user role.");
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.getAllUsersLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.getAllUsersLoading = false;
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.getAllUsersLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(getUserInfo.pending, (state) => {
        state.getUserInfoLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.getUserInfoLoading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.getUserInfoLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.updateUserAvatarLoading = true;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.updateUserAvatarLoading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.updateUserAvatarLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.updateUserInfoLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.updateUserInfoLoading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.updateUserInfoLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.updateUserPasswordLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.updateUserPasswordLoading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.updateUserPasswordLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(deleteUserByAdmin.pending, (state) => {
        state.deleteUserByAdminLoading = true;
      })
      .addCase(deleteUserByAdmin.fulfilled, (state) => {
        state.deleteUserByAdminLoading = false;
      })
      .addCase(deleteUserByAdmin.rejected, (state, action) => {
        state.deleteUserByAdminLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(updateUserRoleByAdmin.pending, (state) => {
        state.updateUserRoleByAdminLoading = true;
      })
      .addCase(updateUserRoleByAdmin.fulfilled, (state) => {
        state.updateUserRoleByAdminLoading = false;
      })
      .addCase(updateUserRoleByAdmin.rejected, (state, action) => {
        state.updateUserRoleByAdminLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { clearUserError } = userSlice.actions;
export const selectUserState = (state: RootState) => state.user;
export default userSlice.reducer;
