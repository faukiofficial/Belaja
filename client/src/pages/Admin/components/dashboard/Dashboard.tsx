import { useEffect } from "react";
import UsersAnalytics from "./components/UsersAnalytics";
import OrdersAnalytics from "./components/OrdersAnalytics";
import { Link } from "react-router-dom";
import CoursesAnalytics from "./components/CoursesAnalytics";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUsersAnalytics,
} from "../../../../redux/slices/analyticSlice";
import { Box, Skeleton } from "@mui/material";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const {
    ordersAnalitycs,
    getOrdersAnalyticsLoading,
    usersAnalitycs,
    getUsersAnalyticsLoading,
    coursesAnalitycs,
    getCoursesAnalyticsLoading,
  } = useAppSelector((state: RootState) => state.analytic);

  useEffect(() => {
    dispatch(getOrdersAnalytics());
    dispatch(getUsersAnalytics());
    dispatch(getCoursesAnalytics());
  }, [dispatch]);
  return (
    <div className="pb-20 w-[90%] mx-auto">
      {getOrdersAnalyticsLoading ||
      getUsersAnalyticsLoading ||
      getCoursesAnalyticsLoading ? (
        <Box m="20px">
          <Box display="grid" gap={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={100}
                animation="wave"
              />
            ))}
          </Box>
        </Box>
      ) : (
        <div>
          <OrdersAnalytics
            ordersAnalitycs={ordersAnalitycs}
          />
          <div className="p-2 bg-gray-300 dark:bg-gray-700 w-fit rounded mt-2">
          <Link to="/admin/orders">
            See All Orders
          </Link>
          </div>
          <UsersAnalytics
            usersAnalitycs={usersAnalitycs}
          />
          <div className="p-2 bg-gray-300 dark:bg-gray-700 w-fit rounded mt-2">
          <Link to="/admin/users">
            See All Users
          </Link>
          </div>
          <CoursesAnalytics
            coursesAnalitycs={coursesAnalitycs}
          />
          <div className="p-2 bg-gray-300 dark:bg-gray-700 w-fit rounded mt-2">
          <Link to="/admin/courses">
            See All Courses
          </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
