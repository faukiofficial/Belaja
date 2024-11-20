import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import analyticReducer from "./slices/analyticSlice";
import orderSlice from "./slices/orderSlice";
import layoutSlice from "./slices/layoutSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        course: courseReducer,
        analytic: analyticReducer,
        order: orderSlice,
        layout: layoutSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store