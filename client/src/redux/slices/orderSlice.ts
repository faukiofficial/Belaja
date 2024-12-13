import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "../store";

const apiUrl = import.meta.env.VITE_SERVER_URI;

interface Transaction {
  transaction_id: string;
  status_code: string;
  transaction_status: string;
  order_id: string;
  gross_amount: string;
  bank?: string;
}

interface PaymentStatus {
  order_id: string;
  transaction_status: string;
  fraud_status: string;
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  course: {
    name: string;
    price: number;
  };
  createdAt: string;
}

interface IOrder {
  orders: Order[] | [];
  order: Order | null;
  stripePublishableKey: string;
  transaction: Transaction | null;
  getOrdersLoading: boolean;
  getStripePublishableKeyLoading: boolean;
  newPaymentLoading: boolean;
  getPaymentStatusLoading: boolean;
  paymentStatus: PaymentStatus | null;
  createOrderLoading: boolean;
  getOrdersError: string | null;
  getStripePublishableKeyError: string | null;
  newPaymentError: string | null;
  createOrderError: string | null;
  getPaymentStatusError: string | null;
}

const initialState: IOrder = {
  orders: [],
  order: null,
  stripePublishableKey: "",
  transaction: null,
  getOrdersLoading: false,
  paymentStatus: null,
  getStripePublishableKeyLoading: false,
  getPaymentStatusLoading: false,
  newPaymentLoading: false,
  createOrderLoading: false,
  getOrdersError: null,
  getStripePublishableKeyError: null,
  newPaymentError: null,
  createOrderError: null,
  getPaymentStatusError: null
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

// export const getStripePublishableKey = createAsyncThunk(
//   "order/getStripePublishableKey",
//   async () => {
//     try {
//       const response = await axios.get(
//         `${apiUrl}/payment/stripe-publishable-key`
//       );
//       if (response.data.success) {
//         return response.data.stripePublishableKey;
//       } else if (response.data.success === false) {
//         toast.error(response.data.message || "Get publishable key failed");
//         throw new Error(response.data.message);
//       }
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         const message =
//           error.response?.data?.message || "Get publishable key failed";
//         toast.error(message);
//       } else {
//         toast.error("An unknown error occurred during get stripe key.");
//       }
//       throw error;
//     }
//   }
// );

// Thunk untuk membuat transaksi baru
export const newPayment = createAsyncThunk<Transaction, { orderId: string; grossAmount: number; paymentType: string }>(
  "order/newPayment",
  async (paymentData) => {
    try {
      const response = await axios.post(`${apiUrl}/payment`, paymentData, {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data.transaction;
      } else {
        throw new Error(response.data.message || "Failed to create payment transaction.");
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred during the payment transaction.";
      toast.error(message);
      throw new Error(message);
    }
  }
);

// Thunk untuk mendapatkan status pembayaran
export const getPaymentStatus = createAsyncThunk<PaymentStatus, string>(
  "order/getPaymentStatus",
  async (orderId) => {
    try {
      const response = await axios.get(`${apiUrl}/payment/status/${orderId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data.status;
      } else {
        throw new Error(response.data.message || "Failed to fetch payment status.");
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred while fetching payment status.";
      toast.error(message);
      throw new Error(message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (courseId, payment_info) => {
    try {
      const response = await axios.post(`${apiUrl}/create-order`, {
        courseId,
        payment_info,
      });
      if (response.data.success) {
        return response.data.order;
      } else if (response.data.success === false) {
        toast.error(response.data.message || "Create order failed");
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Create order failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during create order.");
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
      })
      // .addCase(getStripePublishableKey.pending, (state) => {
      //   state.getStripePublishableKeyLoading = true;
      // })
      // .addCase(getStripePublishableKey.fulfilled, (state, action) => {
      //   state.getStripePublishableKeyLoading = false;
      //   state.stripePublishableKey = action.payload;
      // })
      // .addCase(getStripePublishableKey.rejected, (state, action) => {
      //   state.getStripePublishableKeyLoading = false;
      //   state.getStripePublishableKeyError =
      //     action.error.message || "Get publishable key failed";
      // })
      .addCase(newPayment.pending, (state) => {
        state.newPaymentLoading = true;
        state.newPaymentError = null;
      })
      .addCase(newPayment.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.newPaymentLoading = false;
        state.transaction = action.payload;
      })
      .addCase(newPayment.rejected, (state, action) => {
        state.newPaymentLoading = false;
        state.newPaymentError = action.error.message || "Failed to create payment transaction.";
      })
      .addCase(getPaymentStatus.pending, (state) => {
        state.getPaymentStatusLoading = true;
        state.getPaymentStatusError = null;
      })
      .addCase(getPaymentStatus.fulfilled, (state, action: PayloadAction<PaymentStatus>) => {
        state.getPaymentStatusLoading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(getPaymentStatus.rejected, (state, action) => {
        state.getPaymentStatusLoading = false;
        state.getPaymentStatusError = action.error.message || "Failed to fetch payment status.";
      })
      .addCase(createOrder.pending, (state) => {
        state.createOrderLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderLoading = false;
        state.createOrderError = action.error.message || "Create order failed";
      });
  },
});

export const { clearOrderError } = orderSlice.actions;

export const selectOrderState = (state: RootState) => state.order;

export default orderSlice.reducer;
