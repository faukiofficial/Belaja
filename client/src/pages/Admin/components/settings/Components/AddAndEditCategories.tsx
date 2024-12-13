import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  createLayout,
  editLayout,
  getCategories,
} from "../../../../../redux/slices/layoutSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  title: string;
}

const AddAndEditCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const dispatch = useAppDispatch();
  const { categories: categoryList, editLayoutLoading: categoryLoading } =
    useAppSelector((state) => state.layout);

  useEffect(() => {
    dispatch(getCategories({ type: "Categories" }));
  }, [dispatch]);

  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

  const handleCategoryChange = (id: string, value: string) => {
    const updatedCategories = categories.map((item) => {
      if (item._id === id) {
        return { ...item, title: value };
      }
      return item;
    });
    setCategories(updatedCategories);
  };

  const addNewCategoryHandler = () => {
    const newCategory = {
      _id: `temp-${Date.now()}`,
      title: "",
    };
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== id)
    );
  };

  const handleSave = async () => {
    if (categories.some((item) => !item.title.trim())) {
      toast.error("Please fill in all category inputs before saving.");
      return;
    }

    const data = {
      type: "Categories",
      categories: categories.map((item) => ({
        title: item.title,
        _id: item._id || `temp-${Date.now()}`,
      })),
      faq: [],
    };

    try {
      if (categories.some((item) => item._id)) {
        await dispatch(editLayout(data));
        toast.success("Categories updated successfully!");
      } else {
        await dispatch(createLayout(data));
        toast.success("Categories created successfully!");
      }
    } catch (error) {
      console.error("Failed to save categories:", error);
      toast.error("Failed to save categories. Please try again.");
    }
  };

  return (
    <div>
      <div className="w-[90%] m-auto 800px:w-[80%] my-[40px] pt-5 border-t border-gray-200">
        <h2 className="dark:text-white text-[#000000c7] text-[24px] 600px:text-[30px] 1000px:text-[48px] 1300px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin py-2 leading-snug w-full">
          Add and Edit Categories
        </h2>
        <div>
          {categories.map((item, index) => (
            <div key={item._id || index} className="py-4">
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={item.title}
                onChange={(e) =>
                  handleCategoryChange(
                    item._id || index.toString(),
                    e.target.value
                  )
                }
                placeholder="Add the category title..."
              />
              <AiOutlineDelete
                className="text-[18px] dark:text-white text-black cursor-pointer mt-2"
                onClick={() =>
                  handleDeleteCategory(item._id || index.toString())
                }
              />
            </div>
          ))}

          <IoMdAddCircleOutline
            className="text-[35px] dark:text-white text-black mt-10 cursor-pointer"
            onClick={addNewCategoryHandler}
          />
        </div>

        <button
          className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          onClick={handleSave}
        >
          {categoryLoading ? "Saving..." : "Save Categories"}
        </button>
      </div>
    </div>
  );
};

export default AddAndEditCategories;
