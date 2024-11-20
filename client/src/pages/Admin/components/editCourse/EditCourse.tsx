import { useEffect, useState } from "react";
import CourseOptions from "./CourseOptions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  editCourseById,
  getCourseById,
} from "../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CourseInformationEdit from "./CourseInformationEdit";
import CourseDataEdit from "./CourseDataEdit";
import CourseContentEdit from "./CourseContentEdit";
import CoursePreviewEdit from "./CoursePreviewEdit";

const EditCourse = () => {
  const dispatch = useAppDispatch();

  const { editCourseLoading, editCourseError, course } = useAppSelector(
    (state) => state.course
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, id]);

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
      videoLength: "",
      videoSection: "",
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

  useEffect(() => {
    setCourseInfo({
      name: course?.name,
      description: course?.description,
      price: course?.price,
      estimatedPrice: course?.estimatedPrice,
      tags: course?.tags,
      level: course?.level,
      category: course?.category,
      demoUrl: course?.demoUrl,
      thumbnail: {
        public_id: course?.thumbnail?.public_id,
        url: course?.thumbnail?.url,
        base64: "",
      },
    });
    setBenefits(course?.benefits || [{ title: "" }]);
    setPrerequisites(course?.prerequisites || [{ title: "" }]);
    setCourseContentData(course?.courseData || [{
      videoUrl: "",
      title: "",
      description: "",
      videoLength: "",
      videoSection: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },]);
  }, [course]);

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

  const handleCourseUpdate = async () => {
    const data = courseData;
    if (!editCourseLoading) {
      const result = await dispatch(editCourseById({id ,data}));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Course updated successfully");
        navigate("/admin/courses");
      } else {
        toast.error(editCourseError || "Failed to update course");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex">
      <div className="min-w-[500px] w-[calc(100%-40px)] 1100px:w-[calc(100%-180px)] 1200px:w-[calc(100%-180px)]">
        {active === 0 && (
          <CourseInformationEdit
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseDataEdit
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContentEdit
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreviewEdit
            courseData={courseData}
            active={active}
            setActive={setActive}
            handleCourseUpdate={handleCourseUpdate}
            editCourseLoading={editCourseLoading}
          />
        )}
      </div>
      <div className="w-[70px] 1100px:w-[230px] h-screen fixed top-18 right-0 z-9">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
