import React, { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { createCourse } from "../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const dispatch = useAppDispatch();

  const { createCourseLoading, createCourseError } = useAppSelector(
    (state) => state.course
  );

  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    category: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formattedCourseContentData = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      videoLength: content.videoLength,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));

    setCourseData({
      ...courseInfo,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      totalVideos: courseContentData.length,
      courseData: formattedCourseContentData,
    });
  };

  const handleCourseCreate = async () => {
    const data = courseData;
    if (!createCourseLoading) {
      const result = await dispatch(createCourse(data));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Course created successfully");
        navigate("/admin/courses")
      } else {
        toast.error(createCourseError || "Failed to create course");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex">
      <div className="min-w-[500px] w-[calc(100%-40px)] 1100px:w-[calc(100%-180px)] 1200px:w-[calc(100%-180px)]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
            createCourseLoading={createCourseLoading}
          />
        )}
      </div>
      <div className="w-[70px] 1100px:w-[230px] h-screen fixed top-18 right-0 z-9">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
