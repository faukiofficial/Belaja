import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "../store";

const apiUrl = import.meta.env.VITE_SERVER_URI;

interface CourseContentData {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
}

interface CourseBenefit {
  title: string;
}

interface ICourse {
  _id: string;
  id: string;
  data: [];
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
  benefits: CourseBenefit[];
  prerequisites: CourseBenefit[];
  courseContentData: CourseContentData[];
  ratings?: number;
  purchased?: number;
  createdAt: string;
}

interface CourseState {
  course: ICourse | null;
  courses: ICourse[];
  courseInfo: ICourse | null;
  createCourseLoading: boolean;
  getCourseLoading: boolean;
  getAllCoursesLoading: boolean;
  editCourseLoading: boolean;
  getCourseInfoLoading: boolean;
  updateCourseLoading: boolean;
  deleteCourseLoading: boolean;
  loading: boolean;
  error: string | null;
  courseError: string | null;
  createCourseError: string | null;
  getAllCoursesError: string | null;
  editCourseError: string | null;
  updateCourseError: string | null;
  deleteCourseError: string | null;
}

const initialState: CourseState = {
  course: null,
  courses: [],
  courseInfo: null,
  createCourseLoading: false,
  getCourseLoading: false,
  getAllCoursesLoading: false,
  editCourseLoading: false,
  getCourseInfoLoading: false,
  updateCourseLoading: false,
  deleteCourseLoading: false,
  loading: false,
  error: null,
  courseError: null,
  createCourseError: null,
  getAllCoursesError: null,
  editCourseError: null,
  updateCourseError: null,
  deleteCourseError: null,
};

export const createCourse = createAsyncThunk<ICourse, ICourse>(
  "course/createCourse",
  async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/upload-course`, data, {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data;
      } else if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Create course failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during create course.");
      }
      throw error;
    }
  }
);

export const getCourseById = createAsyncThunk<ICourse, string>(
  "course/getCourseById",
  async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/get-course/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data.course;
      } else if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Get course failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during get course.");
      }
      throw error;
    }
  }
);

export const getAllCourses = createAsyncThunk<ICourse[]>(
  "course/getAllCourses",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/get-courses`, {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data.courses;
      } else if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Get all courses failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during get all courses.");
      }
      throw error;
    }
  }
);

export const editCourseById = createAsyncThunk<ICourse, ICourse>(
  "course/editCourseById",
  async ({id, data}) => {
    try {
      const response = await axios.put(`${apiUrl}/edit-course/${id}`, data, {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data;
      } else if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Update course failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during update course.");
      }
      throw error;
    }
  }
)

export const deleteCourse = createAsyncThunk<void, string>(
  "course/deleteCourse",
  async (courseId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/delete-course/${courseId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Course deleted successfully");
        return response.data;
      } else if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Delete course failed";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred during delete course.");
      }
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearCourseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.createCourseLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.createCourseLoading = false;
        state.course = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.createCourseLoading = false;
        state.createCourseError =
          action.error.message || "Create course failed";
      })
      .addCase(getCourseById.pending, (state) => {
        state.getCourseLoading = true;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.getCourseLoading = false;
        state.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.getCourseLoading = false;
        state.error = action.error.message || "Get course failed";
      })
      .addCase(getAllCourses.pending, (state) => {
        state.getAllCoursesLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.getAllCoursesLoading = false;
        state.courses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.getAllCoursesLoading = false;
        state.getAllCoursesError =
          action.error.message || "Get all courses failed";
      })
      .addCase(editCourseById.pending, (state) => {
        state.editCourseLoading = true;
      })
      .addCase(editCourseById.fulfilled, (state, action) => {
        state.editCourseLoading = false;
        state.course = action.payload;
      })
      .addCase(editCourseById.rejected, (state, action) => {
        state.editCourseLoading = false;
        state.editCourseError = action.error.message || "Update course failed";
      })
      .addCase(deleteCourse.pending, (state) => {
        state.deleteCourseLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state) => {
        state.deleteCourseLoading = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.deleteCourseLoading = false;
        state.deleteCourseError =
          action.error.message || "Delete course failed";
      });
  },
});

export const { clearCourseError } = courseSlice.actions;

export const selectCourseState = (state: RootState) => state.course;

export default courseSlice.reducer;
