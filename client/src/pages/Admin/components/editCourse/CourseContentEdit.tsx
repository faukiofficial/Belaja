import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Link {
  title: string;
  url: string;
}

interface Section {
  videoUrl: string;
  title: string;
  description: string;
  videoLength: string;
  videoSection: string;
  links: Link[];
}

type Props = {
  courseContentData: Section[];
  setCourseContentData: (courseContentData: Section[]) => void;
  active: number;
  setActive: (active: number) => void;
  handleSubmit: () => void;
};


const CourseContentEdit: React.FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCuorseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: Section) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.videoLength === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the field");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    const lastSection = courseContentData[courseContentData.length - 1];
    if (
      lastSection.title === "" ||
      lastSection.description === "" ||
      lastSection.videoUrl === "" ||
      lastSection.videoLength === "" ||
      lastSection.links[0].title === "" ||
      lastSection.links[0].url === ""
    ) {
      toast.error("Please fill all the field in the section");
    } else {
      const newSection: Section = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: "",
        links: [{ title: "", url: "" }],
      };
  
      setCourseContentData([...courseContentData, newSection]);
      setActiveSection(activeSection + 1);
    }
  };

  const handleTitleChange = (index: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[index] = { ...updatedData[index], title: value };
    setCourseContentData(updatedData);
  };

  const handleVideoUrlChange = (index: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[index] = { ...updatedData[index], videoUrl: value };
    setCourseContentData(updatedData);
  };

  const handleVideoLengthChange = (index: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[index] = { ...updatedData[index], videoLength: value };
    setCourseContentData(updatedData);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[index] = { ...updatedData[index], description: value };
    setCourseContentData(updatedData);
  };

  const handleLinkTitleChange = (sectionIndex: number, linkIndex: number, value: string) => {
    const updatedData = [...courseContentData];  // Make a shallow copy of the array
    const updatedLinks = [...updatedData[sectionIndex].links];  // Create a new array for the links
    updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], title: value };  // Create a new object for the link
    updatedData[sectionIndex].links = updatedLinks;  // Update the section with the new links array
    setCourseContentData(updatedData);  // Set the updated data to the state
  };
  
  const handleLinkUrlChange = (sectionIndex: number, linkIndex: number, value: string) => {
    const updatedData = [...courseContentData]; 
    const updatedLinks = [...updatedData[sectionIndex].links]; 
    updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], url: value };
    updatedData[sectionIndex].links = updatedLinks;
    setCourseContentData(updatedData);
  };

  const handlePrev = () => {
    setActive(active - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    const lastSection = courseContentData[courseContentData.length - 1];
    if (
      lastSection.title === "" ||
      lastSection.description === "" ||
      lastSection.videoUrl === "" ||
      lastSection.videoLength === "" ||
      lastSection.links[0].title === "" ||
      lastSection.links[0].url === ""
    ) {
      toast.error("Please fill all the field in the section");
    } else {
      setActive(active + 1);
      handleCuorseSubmit();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-[80%] m-auto pb-10">
      <form action="" onSubmit={handleSubmit}>
        {courseContentData?.map((item, index) => {
          const showSectionInput =
          index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-white dark:bg-slate-700 p-4 ${showSectionInput && index !== 0 ? "mt-10" : ""}`}
              >
                {showSectionInput && (
                  <>
                    <div className="w-full flex items-center gap-2 mb-5">
                      <input
                        type="text"
                        className={`text-[20px] p-2 cursor-pointer text-black dark:text-white bg-transparent outline-none border`}
                        value={item.videoSection}
                        placeholder={`Section ${index + 1} Title`}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="cursor-pointer text-black dark:text-white" />
                    </div>
                  </>
                )}
                <div className="w-full flex items-center justify-between my-0">
                  <div className="text-black dark:text-white p-2 w-fit bg-slate-100 dark:bg-slate-600 rounded-md">
                    {index + 1}. {item.title ? item.title : "Untitled Content"}
                  </div>

                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="text-black dark:text-white"
                      style={{
                        transform: isCollapsed[index]
                          ? "rorate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label htmlFor="">Video Title</label>
                      <input
                        type="text"
                        placeholder="Enter video title"
                        value={item.title}
                        className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
                        onChange={(e) => handleTitleChange(index, e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Video Url</label>
                      <input
                        type="text"
                        placeholder="Enter video url"
                        value={item.videoUrl}
                        className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
                        onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Video Length</label>
                      <input
                        type="number"
                        placeholder="Enter video length in minute"
                        value={item.videoLength}
                        className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
                        onChange={(e) => handleVideoLengthChange(index, e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Video Description</label>
                      <textarea
                        placeholder="Enter video description"
                        value={item.description}
                        rows={5}
                        className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                      />
                    </div>
                    {item?.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="my-3">
                        <div className="flex items-center justify-between">
                          <label htmlFor="">Link {linkIndex + 1}</label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (Link title)"
                          value={link.title}
                          className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
                          onChange={(e) => handleLinkTitleChange(index, linkIndex, e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Source Code Url... (Link URL)"
                          value={link.url}
                          className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
                          onChange={(e) => handleLinkUrlChange(index, linkIndex, e.target.value)}
                        />
                      </div>
                    ))}
                    <div className="inline-block">
                      <p
                        className="flex items-center text-[18px] text-black dark:text-white cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}

                {index === courseContentData.length - 1 && (
                  <div className="mt-4 w-fit border p-2 rounded-md">
                    <p
                      className="flex items-center text-[18px] text-black dark:text-white cursor-pointer"
                      onClick={() => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <div className="mt-4 w-full cursor-pointer flex justify-center">
        <div
          className="flex items-center text-[20px] bg-white dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-black dark:text-white border-2 p-2 rounded-md"
          onClick={addNewSection}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add New Section
        </div>
        </div>
      </form>
      <div className="w-full flex items-center justify-start gap-5 mt-4">
        <button
          onClick={handlePrev}
          className="w-[200px] p-2 border border-gray-300 rounded bg-blue-500 hover:bg-blue-600 text-white dark:border-gray-600 dark:text-white mt-2"
        >
          Prev
        </button>
        <button
          type="submit"
          onClick={handleNext}
          className="w-[200px] p-2 border border-gray-300 rounded bg-blue-500 hover:bg-blue-600 text-white dark:border-gray-600 dark:text-white mt-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContentEdit;
