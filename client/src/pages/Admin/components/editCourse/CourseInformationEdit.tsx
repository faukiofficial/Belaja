import React, { FC, useState } from "react";

type Props = {
  courseInfo: {
    name: string;
    description: string;
    price: string;
    estimatedPrice?: string;
    tags: string;
    level: string;
    category: string;
    demoUrl: string;
    thumbnail: string;
  };
  setCourseInfo: (courseInfo: {
    name: string;
    description: string;
    price: string;
    estimatedPrice?: string;
    tags: string;
    level: string;
    category: string;
    demoUrl: string;
    thumbnail: string;
  }) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformationEdit: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActive(active + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleImageChange = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setCourseInfo({
        ...courseInfo,
        thumbnail: {
          ...courseInfo.thumbnail,
          base64: base64String,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleImageChange(file);
    }
  };

  return (
    <div className="w-[80%] m-auto pb-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="w-full">
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            id="name"
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="Enter the course name"
            className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={10}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            placeholder="Enter the course description"
            className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
            required
          />
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="w-[48%]">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="Enter the course price"
              className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
              required
              style={{
                WebkitAppearance: "none", // Chrome, Safari, Edge
                MozAppearance: "textfield", // Firefox
              }}
            />
          </div>
          <div className="w-[48%]">
            <label htmlFor="estimatedPrice">Estimated Price (optional)</label>
            <input
              type="number"
              id="estimatedPrice"
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="Enter the course estimated price"
              className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
              style={{
                WebkitAppearance: "none", // Chrome, Safari, Edge
                MozAppearance: "textfield", // Firefox
              }}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="w-[48%]">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="Tag1,Tag2,Tag3"
              className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
              required
            />
          </div>
          <div className="w-[48%]">
            <label htmlFor="demoUrl">Demo Url</label>
            <input
              type="text"
              id="demoUrl"
              value={courseInfo.demoUrl}
              required
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="Enter the youtube link"
              className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="w-[48%]">
            <label htmlFor="level">Level</label>
            <select
              id="level"
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className={`w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2 ${
                courseInfo.level === ""
                  ? "text-gray-400 dark:text-[#9CA3AF]"
                  : ""
              }`}
              required
            >
              <option value="" className="text-gray-400">
                Select the course level
              </option>
              <option value="Beginner" className="text-black dark:text-white">
                Beginner
              </option>
              <option
                value="Intermediate"
                className="text-black dark:text-white"
              >
                Intermediate
              </option>
              <option value="Expert" className="text-black dark:text-white">
                Expert
              </option>
            </select>
          </div>
          <div className="w-[48%]">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={courseInfo.category}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
              className={`w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2 ${
                courseInfo.level === ""
                  ? "text-gray-400 dark:text-[#9CA3AF]"
                  : ""
              }`}
              required
            >
              <option value="" className="text-gray-400">
                Select the course category
              </option>
              <option value="Category 1" className="text-black dark:text-white">
                Category 1
              </option>
              <option value="Category 2" className="text-black dark:text-white">
                Category 2
              </option>
              <option value="Category 3" className="text-black dark:text-white">
                Category 3
              </option>
            </select>
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="image">
            <div
              className={`w-full p-2 600px:p-3 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2 flex items-center justify-center cursor-pointer relative ${
                dragging ? "bg-gray-100" : ""
              } ${!courseInfo.thumbnail ? "h-[200px]" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              {courseInfo.thumbnail ? (
                <>
                  <img
                    src={
                      courseInfo.thumbnail.base64 !== ""
                        ? courseInfo.thumbnail.base64
                        : courseInfo.thumbnail.url
                    }
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white">Change</p>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 dark:text-gray-400">
                  {dragging
                    ? "Drop the image here"
                    : "Upload a thumbnail (click or drag and drop here)"}
                </p>
              )}
            </div>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageChange(file);
            }}
            id="image"
            className="hidden"
          />
        </div>

        <div className="w-full flex items-center justify-end">
          <button
            type="submit"
            className="w-[200px] p-2 border border-gray-300 rounded bg-blue-500 hover:bg-blue-600 text-white dark:border-gray-600 dark:text-white mt-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationEdit;
