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
  videoLength: string;
  links: { title: string; url: string }[];
  suggestion: string;
}

export interface ICourseData {
  _id: string;
  videoUrl: string;
  title: string;
  description: string;
  videoLength: string;
  videoSection: string;
  links: [
    {
      title: string;
      url: string;
    }
  ];
  suggestion: string;
}

export interface IReview {
  _id: string;
  rating: number;
  review: string;
  user: {
    name: string;
    avatar: { public_id: string; url: string; };
  };
}

export interface ICourse {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  category: string;
  demoUrl: string;
  thumbnail: { public_id: string; url: string; base64: string };
  benefits: [{ title: string, _id?: string }];
  prerequisites: [{ title: string, _id?: string }];
  courseContentData: CourseContentData[];
  createdAt: string;
  data: ICourse[];
  courseData: ICourseData[];
  ratings: number;
  purchased: string;
  totalVideos: number;
  reviews: IReview[];
}

interface CourseState {
  course: ICourse | null;
  courses: ICourse[];
  newFiveCourses: ICourse[];
  courseInfo: ICourse | null;
  createCourseLoading: boolean;
  getCourseLoading: boolean;
  getAllCoursesLoading: boolean;
  getNewFiveCoursesLoading: boolean;
  editCourseLoading: boolean;
  getCourseInfoLoading: boolean;
  updateCourseLoading: boolean;
  deleteCourseLoading: boolean;
  loading: boolean;
  error: string | null;
  courseError: string | null;
  createCourseError: string | null;
  getAllCoursesError: string | null;
  getNewFiveCoursesError: string | null;
  editCourseError: string | null;
  updateCourseError: string | null;
  deleteCourseError: string | null;
}

const initialState: CourseState = {
  course: null,
  courses: [],
  newFiveCourses: [],
  courseInfo: null,
  createCourseLoading: false,
  getCourseLoading: false,
  getAllCoursesLoading: false,
  getNewFiveCoursesLoading: false,
  editCourseLoading: false,
  getCourseInfoLoading: false,
  updateCourseLoading: false,
  deleteCourseLoading: false,
  loading: false,
  error: null,
  courseError: null,
  createCourseError: null,
  getAllCoursesError: null,
  getNewFiveCoursesError: null,
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

export const getNewFiveCourses = createAsyncThunk<ICourse[]>(
  "course/getNewFiveCourses",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/get-new-five-courses`);
      return response.data.courses;
    } catch (error: unknown) {
      console.log("error", error);
    }
  }
);

export const editCourseById = createAsyncThunk<ICourse, ICourse>(
  "course/editCourseById",
  async ({ id, data }) => {
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
);

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
      .addCase(getNewFiveCourses.pending, (state) => {
        state.getNewFiveCoursesLoading = true;
      })
      .addCase(getNewFiveCourses.fulfilled, (state, action) => {
        state.getNewFiveCoursesLoading = false;
        state.newFiveCourses = action.payload;
      })
      .addCase(getNewFiveCourses.rejected, (state, action) => {
        state.getNewFiveCoursesLoading = false;
        state.getNewFiveCoursesError =
          action.error.message || "Get new five courses failed";
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
