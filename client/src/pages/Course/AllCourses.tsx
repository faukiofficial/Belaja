import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllCourses } from "../../redux/slices/courseSlice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Skeleton } from "@mui/material";
import Ratings from "../../utils/Ratings";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

interface Course {
  _id: string;
  name: string;
  category: string;
  price: number;
  estimatedPrice: number;
  thumbnail?: { url: string };
  ratings: number;
  totalVideos: number;
  purchased: number;
}

const AllCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { courses: rawCourses, getAllCoursesLoading } = useAppSelector(
    (state) => state.course
  );
  const { userInfo } = useAppSelector((state) => state.user);

  const isPurchased = (id: string) => {
    return userInfo?.courses.includes(id);
  };

  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("nameAsc");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const courses: Course[] = rawCourses.map((course) => ({
    ...course,
    purchased: parseInt(course.purchased, 10),
  }));

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const filterCourses = useCallback(() => {
    const filtered = courses
      ?.filter((course) => {
        const lowerCaseSearch = searchQuery.toLowerCase();
        return (
          course.name.toLowerCase().includes(lowerCaseSearch) ||
          course.category.toLowerCase().includes(lowerCaseSearch)
        );
      })
      .filter((course) => {
        if (!selectedCategory) return true;
        return course.category === selectedCategory;
      });
    return sortedCourses(filtered);
  }, [courses, searchQuery, selectedCategory, sortOrder]);

  const sortedCourses = (coursesToSort: Course[]) => {
    return coursesToSort?.sort((a, b) => {
      switch (sortOrder) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    setFilteredCourses(filterCourses());
  }, [filterCourses]);

  const handleSearch = () => {
    navigate("/courses");
    setFilteredCourses(filterCourses());
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-black dark:text-white">
      <Header />

      <div className="bg-slate-100 dark:bg-gray-900 text-black dark:text-white py-10 p-4 px-6 lg:px-32 w-full pt-32">
        <div className="mb-10 flex justify-between">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by name or category"
              className="p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white w-[400px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-900 text-white px-4 rounded hover:bg-blue-800"
            >
              <AiOutlineSearch size={24} />
            </button>
          </div>

          <div className="flex gap-2 text-black">
            <select
              className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="nameAsc">Sort by Name (A-Z)</option>
              <option value="nameDesc">Sort by Name (Z-A)</option>
              <option value="priceAsc">Sort by Price (Low to High)</option>
              <option value="priceDesc">Sort by Price (High to Low)</option>
            </select>

            <select
              className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {Array.from(
                new Set(courses.map((course) => course.category))
              ).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getAllCoursesLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={300}
                  height={350}
                  className="max-w-[300px] lg:max-w-[420px] h-[350px] lg:h-[420px] rounded-xl"
                />
              ))
            : filteredCourses?.map((course) => (
                <div
                  key={course._id}
                  className="relative cursor-pointer snap-center scroll-ml-6 shrink-0"
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
                  <div className="overflow-hidden max-w-[300px] lg:max-w-[420px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-lg transition-transform duration-200 transform">
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
                        <div>
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

      <Footer />
    </div>
  );
};

export default AllCourses;
