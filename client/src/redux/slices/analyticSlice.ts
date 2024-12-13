import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "../store";

const apiUrl = import.meta.env.VITE_SERVER_URI;

export interface AnalyticData {
  month: string;
  count: number;
}

interface IAnalytic {
    coursesAnalitycs: AnalyticData[],
    getCoursesAnalyticsLoading: boolean,
    getCoursesAnalyticsError: string | null
    usersAnalitycs: AnalyticData[],
    getUsersAnalyticsLoading: boolean,
    getUsersAnalyticsError: string | null,
    ordersAnalitycs: AnalyticData[],
    getOrdersAnalyticsLoading: boolean,
    getOrdersAnalyticsError: string | null
}

const initialState: IAnalytic = {
    coursesAnalitycs: [],
    getCoursesAnalyticsLoading: false,
    getCoursesAnalyticsError: null,
    usersAnalitycs: [],
    getUsersAnalyticsLoading: false,
    getUsersAnalyticsError: null,
    ordersAnalitycs: [],
    getOrdersAnalyticsLoading: false,
    getOrdersAnalyticsError: null
}


export const getCoursesAnalytics = createAsyncThunk<AnalyticData[]>(
    "analytic/getCoursesAnalytics",
    async () => {
      try {
        const response = await axios.get(`${apiUrl}/get-courses-analytics`, {
          withCredentials: true,
        });
        if (response.data.success) {
          return response.data.courses.last12Months;
        } else if (response.data.success === false) {
          throw new Error(response.data.message);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Get courses analytics failed";
          toast.error(message);
        } else {
          toast.error("An unknown error occurred during get courses analytics.");
        }
        throw error;
      }
    }
  );

export const getUsersAnalytics = createAsyncThunk<AnalyticData[]>(
    "analytic/getUsersAnalytics",
    async () => {
      try {
        const response = await axios.get(`${apiUrl}/get-users-analytics`, {
          withCredentials: true,
        });
        if (response.data.success) {
          return response.data.users.last12Months;
        } else if (response.data.success === false) {
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Get users analytics failed";
          toast.error(message);
        } else {
          toast.error("An unknown error occurred during get users analytics.");
        }
        throw error;
      }
    }
  );

export const getOrdersAnalytics = createAsyncThunk<AnalyticData[]>(
    "analytic/getOrdersAnalytics",
    async () => {
      try {
        const response = await axios.get(`${apiUrl}/get-orders-analytics`, {
          withCredentials: true,
        });
        if (response.data.success) {
          return response.data.orders.last12Months;
        } else if (response.data.success === false) {
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Get users analytics failed";
          toast.error(message);
        } else {
          toast.error("An unknown error occurred during get users analytics.");
        }
        throw error;
      }
    }
  );


  const analyticSlice = createSlice({
    name: "analytic",
    initialState,
    reducers: {
        clearAnalyticError: (state) => {
            state.getCoursesAnalyticsError = null;
            state.getUsersAnalyticsError = null;
            state.getOrdersAnalyticsError = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getCoursesAnalytics.pending, (state) => {
            state.getCoursesAnalyticsLoading = true;
          })
          .addCase(getCoursesAnalytics.fulfilled, (state, action) => {
            state.getCoursesAnalyticsLoading = false;
            state.coursesAnalitycs = action.payload;
          })
          .addCase(getCoursesAnalytics.rejected, (state, action) => {
            state.getCoursesAnalyticsLoading = false;
            state.getCoursesAnalyticsError =
              action.error.message || "Get courses analytics failed";
          })
          .addCase(getUsersAnalytics.pending, (state) => {
            state.getUsersAnalyticsLoading = true;
          })
          .addCase(getUsersAnalytics.fulfilled, (state, action) => {
            state.getUsersAnalyticsLoading = false;
            state.usersAnalitycs = action.payload;
          })
          .addCase(getUsersAnalytics.rejected, (state, action) => {
            state.getUsersAnalyticsLoading = false;
            state.getUsersAnalyticsError =
              action.error.message || "Get users analytics failed";
          })
          .addCase(getOrdersAnalytics.pending, (state) => {
            state.getOrdersAnalyticsLoading = true;
          })
          .addCase(getOrdersAnalytics.fulfilled, (state, action) => {
            state.getOrdersAnalyticsLoading = false;
            state.ordersAnalitycs = action.payload;
          })
          .addCase(getOrdersAnalytics.rejected, (state, action) => {
            state.getOrdersAnalyticsLoading = false;
            state.getOrdersAnalyticsError =
              action.error.message || "Get orders analytics failed";
          });
      },
  })

export const { clearAnalyticError } = analyticSlice.actions;

export const selectAnalyticState = (state: RootState) => state.analytic;

export default analyticSlice.reducer;