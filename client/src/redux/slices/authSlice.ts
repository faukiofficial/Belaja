import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_SERVER_URI;

interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  isVerified?: boolean;
  avatar?: {
    object_id: string;
    url: string;
  };
}

interface IAuthState {
  isAuthenticated: boolean;
  loading: boolean;
  registrationLoading: boolean;
  activationLoading: boolean;
  loginLoading: boolean;
  socialAuthLoading: boolean;
  logoutLoading: boolean;
  error: string | null;
  registrationError: string | null;
  activationError: string | null;
  loginError: string | null;
  socialAuthError: string | null;
  logoutError: string | null;
  user: IUser | null;
  accessToken: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  loading: false,
  registrationLoading: false,
  activationLoading: false,
  loginLoading: false,
  socialAuthLoading: false,
  logoutLoading: false,
  error: null,
  registrationError: null,
  activationError: null,
  loginError: null,
  socialAuthError: null,
  logoutError: null,
  user: null,
  accessToken: null,
};

// register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/registration`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        return response.data;
      } else if (response.data.succes === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Registration failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during registration.");
      }
      throw error;
    }
  }
);

// activate user
export const activateUser = createAsyncThunk(
  "auth/activateUser",
  async ({
    activationToken,
    activationCode,
  }: {
    activationToken: string;
    activationCode: string;
  }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/activate-user`,
        { activationToken, activationCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else if (response.data.succes === false) {
        // toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Activation failed";
        if (message === "jwt expired") {
          toast.error("Token expired");
        } else {
          toast.error(message);
        }
      } else {
        toast.error("An unknown error occurred during activation.");
      }
      throw error;
    }
  }
);

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // toast.success("Login Successfully");
        // console.log('user', response.data.user)
        return response.data;
      } else if (response.data.succes === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Login failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during login.");
      }
      throw error;
    }
  }
);

// social auth
export const socialAuth = createAsyncThunk(
  "auth/socialAuth",
  async ({
    name,
    email,
    picture,
  }: {
    name: string;
    email: string;
    picture: string;
  }) => {
    console.log(name, email, picture);
    try {
      const response = await axios.post(
        `${apiUrl}/social-auth`,
        {
          name,
          email,
          picture,
        },
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Login failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during login.");
      }
      throw error;
    }
  }
);

// logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.get(`${apiUrl}/logout`, {
      withCredentials: true,
    });
    if (response.data.success) {
      return response.data;
    } else if (response.data.succes === false) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Logout failed";
      toast.error(message);
    } else {
      toast.error("An unknown error occurred during login.");
    }
    throw error;
  }
});

// refresh accessToken
export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  try {
    const response = await axios.get(`${apiUrl}/refresh-token`, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    } else if (response.data.success === false) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registrationLoading = true;
        state.registrationError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registrationLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationLoading = false;
        state.registrationError =
          action.error.message || "Something went wrong";
      })
      .addCase(activateUser.pending, (state) => {
        state.activationLoading = true;
        state.activationError = null;
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.activationLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.activationLoading = false;
        state.activationError = action.error.message || "Something went wrong";
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error.message || "Something went wrong";
      })
      .addCase(socialAuth.pending, (state) => {
        state.socialAuthLoading = true;
        state.socialAuthError = null;
      })
      .addCase(socialAuth.fulfilled, (state, action) => {
        state.socialAuthLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(socialAuth.rejected, (state, action) => {
        state.socialAuthLoading = false;
        state.socialAuthError = action.error.message || "Something went wrong";
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error.message || "Something went wrong";
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
