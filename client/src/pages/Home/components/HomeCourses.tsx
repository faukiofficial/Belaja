import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import { getNewFiveCourses } from "../../../redux/slices/courseSlice";
import Ratings from "../../../utils/Ratings";

const HomeCourses = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { newFiveCourses, getNewFiveCoursesLoading } = useAppSelector(
    (state) => state.course
  );

  const { userInfo } = useAppSelector((state) => state.user);

  const isPurchased = (id: string) => {
    return userInfo?.courses.includes(id);
  };

  useEffect(() => {
    dispatch(getNewFiveCourses());
  }, [dispatch]);

  return (
    <div className="w-full bg-slate-100 dark:bg-gray-900 p-4 px-6 lg:px-32">
      <div className="flex w-full gap-6 pb-8 mt-8 overflow-x-auto sm:mt-12 lg:mt-16 snap-x">
        {getNewFiveCoursesLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="relative snap-center scroll-ml-6 shrink-0"
              >
                <Skeleton
                  variant="rectangular"
                  width={300}
                  height={350}
                  className="w-[300px] lg:w-[420px] h-[350px] lg:h-[420px] rounded-2xl"
                />
              </div>
            ))
          : newFiveCourses?.map((course, index) => (
              <div
                key={index}
                className="relative snap-center scroll-ml-6 shrink-0 cursor-pointer"
                onClick={() =>
                  navigate(
                    `${
                      isPurchased(course._id)
                        ? `/course-access/${course._id}`
                        : `/course/${course._id}`
                    }`
                  )
                }
              >
                <div className="overflow-hidden w-[300px] lg:w-[420px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-lg transition-transform duration-200 transform hover:-translate-y-1">
                  <img
                    src={course.thumbnail?.url || "default-thumbnail-url.jpg"}
                    alt={course.name}
                    className="w-full h-[200px] object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {course.name}
                    </h3>

                    <div className="flex items-center gap-1 my-2">
                      <Ratings rating={course.ratings || 0} />
                    </div>

                    <div className="flex justify-between">
                      <div className="">
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          Rp. {course.estimatedPrice}
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium text-lg">
                          Rp. {course.price}
                        </p>
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>{course.totalVideos} videos</p>
                        <p>{course.purchased} enrolled</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default HomeCourses;
