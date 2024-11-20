import { FC } from "react";
import CoursePlayer from "../../../../utils/CoursePlayer";
import Ratings from "../../../../utils/Ratings";
import { IoCheckmarkSharp } from "react-icons/io5";
import { ICourse } from "../../../../redux/slices/courseSlice";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: ICourse;
  handleCourseUpdate: () => void;
  editCourseLoading: boolean;
};

const CoursePreviewEdit: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseUpdate,
  editCourseLoading
}) => {
  const discount = Math.floor(
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
      100
  );

  const handlePrev = () => {
    setActive(active - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const createCourse = () => {
    handleCourseUpdate();
  };

  return (
    <div className="w-[80%] mx-auto pb-10">
      <div className="w-full relative">
        <div className="w-full">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.name}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : "Rp. " + courseData?.price}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">{discount}% Off</h4>
        </div>

        <div className="flex items-center mt-3">
          <div className="bg-red-600 hover:bg-red-500 text-center text-white py-2 w-fit px-10 rounded-full text-lg cursor-pointer">
            Buy Now{" "}
            {courseData?.price === 0 ? "Free" : "Rp. " + courseData?.price}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <input
            type="text"
            placeholder="Enter Promo Code"
            className="w-[400px] p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="bg-blue-600 hover:bg-blue-500 text-center text-white py-2 w-fit px-10 rounded-2xl text-lg cursor-pointer">
            Apply
          </div>
        </div>
        <ul className="mt-5">
          <li>- Source Code Included</li>
          <li>- 30 Day Money Back Guarantee</li>
          <li>- 24/7 Support</li>
          <li>- Free Lifetime Updates</li>
          <li>- 100% Satisfaction Guarantee</li>
        </ul>
      </div>

      <div className="w-full mt-5">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-[600]">{courseData?.name}</h1>
          <div className="flex items-center justify-between pt-3">
            <div>
              <Ratings rating={courseData?.ratings || 0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
        </div>
      </div>
      <h1 className="text-[25px] font-[600] mt-5">
        What you need to know before taking this course
      </h1>
      {courseData?.prerequisites?.map((prerequisite: { title: string }, index: number) => (
        <div key={index} className="w-full mt-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <IoCheckmarkSharp size={20} />
            <p>{prerequisite.title}</p>
          </div>
        </div>
      ))}
      <h1 className="text-[25px] font-[600] mt-5">
        What you will get from this course?
      </h1>
      {courseData?.benefits?.map((benefit: { title: string }, index: number) => (
        <div key={index} className="w-full mt-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <IoCheckmarkSharp size={20} />
            <p>{benefit.title}</p>
          </div>
        </div>
      ))}

      <div className="w-full mt-5">
        <h1 className="text-[25px] font-[600]">Course Details</h1>
        <p className="mt-3 text-[16px] whitespace-pre-line w-full overflow-hidden">
          {courseData?.description}
        </p>
      </div>

      <div className="w-full flex items-center justify-start gap-5 mt-4">
        <button
          onClick={handlePrev}
          className="w-[200px] p-2 border border-gray-300 rounded bg-blue-500 hover:bg-blue-600 text-white dark:border-gray-600 dark:text-white mt-2"
        >
          Prev
        </button>
        <button
          type="submit"
          onClick={createCourse}
          className="w-[200px] p-2 border border-gray-300 rounded bg-blue-500 hover:bg-blue-600 text-white dark:border-gray-600 dark:text-white mt-2"
        >
          {editCourseLoading? "Loading..." : "Update Course"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreviewEdit;
