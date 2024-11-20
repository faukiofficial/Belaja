import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { useEffect } from "react";
import { refreshToken } from "./redux/slices/authSlice";
import { getUserInfo } from "./redux/slices/userSlice";
import Home from "./pages/Home/Home";
import { useAppSelector } from "./redux/hooks";
import GetUserInfoLoading from "./components/authComponent/GetUserInfoLoading";
import Profile from "./pages/Profile/Profile";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import { AdminRoute } from "./utils/AdminRoute";
import CreateCourse from "./pages/Admin/components/createCourse/CreateCourse";
import ProfileInfo from "./pages/Profile/components/ProfileInfo";
import ChangePassword from "./pages/Profile/components/ChangePassword";
import ScrollToTop from "./utils/ScrollToTop";
import Courses from "./pages/Admin/components/courses/Courses";
import Users from "./pages/Admin/components/users/Users";
import ManageTeam from "./pages/Admin/components/manageTeam/ManageTeam";
import Dashboard from "./pages/Admin/components/dashboard/Dashboard";
import EditCourse from "./pages/Admin/components/editCourse/EditCourse";
import ScrollButtons from "./components/ScrollButtons";
import Orders from "./pages/Admin/components/orders/Orders";
import Settings from "./pages/Admin/components/settings/Settings";
import CobaHeader from "./components/CobaHeader";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { getUserInfoLoading, userInfo } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(refreshToken())
      .then(() => {
        dispatch(getUserInfo()).then(() => {});
      })
      .catch((error) => {
        console.log("Refresh token failed", error);
      });
  }, [dispatch]);

  return (
    <Router>
      <GetUserInfoLoading isLoading={getUserInfoLoading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coba" element={<CobaHeader />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile userInfo={userInfo} />
            </ProtectedRoute>
          }
        >
          <Route
            path="my-account"
            element={<ProfileInfo userInfo={userInfo} />}
          />
          <Route path="password" element={<ChangePassword />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin userInfo={userInfo} />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="courses" element={<Courses />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="edit-course/:id" element={<EditCourse />} />
          <Route path="manage-team" element={<ManageTeam />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <ScrollToTop />
      <ScrollButtons />
    </Router>
  );
}

export default App;
