import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "../store";

const apiUrl = import.meta.env.VITE_SERVER_URI;

interface IOrder {
  orders: [];
  getOrdersLoading: boolean;
  getOrdersError: string | null;
}

const initialState: IOrder = {
  orders: [],
  getOrdersLoading: false,
  getOrdersError: null,
};

export const getOrders = createAsyncThunk<IOrder[]>(
  "order/getOrders",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/get-all-orders`, {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data.orders;
      } else if (response.data.success === false) {
        toast.error(response.data.message || "Get orders failed");
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Get orders data failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during get orders.");
      }
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.getOrdersError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.getOrdersLoading = true;
        state.getOrdersError = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrdersLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.getOrdersLoading = false;
        state.getOrdersError = action.error.message || "Get orders failed";
      });
  },
});

export const { clearOrderError } = orderSlice.actions;

export const selectOrderState = (state: RootState) => state.order;

export default orderSlice.reducer;
