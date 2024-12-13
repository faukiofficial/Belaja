import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "../store";

const apiUrl = import.meta.env.VITE_SERVER_URI;

export interface Category {
  _id: string;
  title: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  active: boolean;
}

interface LayoutState {
    faq: FAQ[];
    categories: Category[];
    createLayoutLoading: boolean;
    createLayoutError: string | null;
    editLayoutLoading: boolean;
    editLayoutError: string | null;
    getCategoriesLoading: boolean;
    getCategoriesError: string | null;
    getFAQLoading: boolean;
    getFAQError: string | null;
}

const initialState: LayoutState = {
    faq: [],
    categories: [],
    createLayoutLoading: false,
    createLayoutError: null,
    editLayoutLoading: false,
    editLayoutError: null,
    getCategoriesLoading: false,
    getCategoriesError: null,
    getFAQLoading: false,
    getFAQError: null,
};

export const createLayout = createAsyncThunk<LayoutState, {type: string, categories: Category[], faq: FAQ[]}>(
  "layout/createLayout",
  async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/create-layout`, data, {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Create layout failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during create layout.");
      }
      throw error;
    }
  }
);

export const editLayout = createAsyncThunk<LayoutState, {type: string, categories: Category[], faq: FAQ[]}>(
  "layout/editLayout",
  async (data) => {
    try {
      const response = await axios.put(`${apiUrl}/edit-layout`, data, {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Edit layout failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during edit layout.");
      }
      throw error;
    }
  }
);

export const getCategories = createAsyncThunk<LayoutState, {type: string}>(
  "layout/getCategories",
  async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/get-layout-by-type`, data);
      if (response.data.success) {
        return response.data.layout;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFAQ = createAsyncThunk<LayoutState, {type: string}>(
  "layout/getFAQ",
  async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/get-layout-by-type`, data);
      if (response.data.success) {
        return response.data.layout;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    clearLayoutError: (state) => {
      state.createLayoutError = null;
      state.editLayoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLayout.pending, (state) => {
        state.createLayoutLoading = true;
        state.createLayoutError = null;
      })
      .addCase(createLayout.fulfilled, (state) => {
        state.createLayoutLoading = false;
      })
      .addCase(createLayout.rejected, (state, action) => {
        state.createLayoutLoading = false;
        state.createLayoutError = action.error.message || "Create layout failed";
      })
      .addCase(editLayout.pending, (state) => {
        state.editLayoutLoading = true;
        state.editLayoutError = null;
      })
      .addCase(editLayout.fulfilled, (state) => {
        state.editLayoutLoading = false;
      })
      .addCase(editLayout.rejected, (state, action) => {
        state.editLayoutLoading = false;
        state.editLayoutError = action.error.message || "Edit layout failed";
      })
      .addCase(getCategories.pending, (state) => {
        state.getCategoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.getCategoriesLoading = false;
        state.categories = action.payload.categories;
      })
      .addCase(getCategories.rejected, (state) => {
        state.getCategoriesLoading = false;
        state.getCategoriesError = "Get categories failed";
      })
      .addCase(getFAQ.pending, (state) => {
        state.getFAQLoading = true;
      })
      .addCase(getFAQ.fulfilled, (state, action) => {
        state.getFAQLoading = false;
        state.faq = action.payload.faq;
      })
      .addCase(getFAQ.rejected, (state) => {
        state.getFAQLoading = false;
        state.getFAQError = "Get FAQ failed";
      })
  },
});

export const { clearLayoutError } = layoutSlice.actions;

export const selectLayoutState = (state: RootState) => state.layout;

export default layoutSlice.reducer;
