import React, { FC } from "react";
import { IoCheckmark } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="w-full flex py-5 items-center">
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white"
            } relative`}
            title={option}
          >
            <IoCheckmark className="text-[25px]" />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg-blue-500" : "bg-gray-500"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5
            className={`pl-3 dark:text-white text-black text-[16px] hidden 1100px:block`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
