import { FC } from "react";
import toast from "react-hot-toast";
import { GrAddCircle } from "react-icons/gr";
import { GrFormClose } from "react-icons/gr";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseDataEdit: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = benefits.map((item, i) =>
      i === index ? { ...item, title: value } : item
    );

    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedPrerequisites = prerequisites.map((item, i) =>
      i === index ? { ...item, title: value } : item
    );
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleRemovePrerequisite = (index: number) => {
    const updatedPrerequisites = prerequisites.filter((_, i) => i !== index);
    setPrerequisites(updatedPrerequisites);
  };

  const handlePrev = () => {
    setActive(active - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      toast.error("Please fill all the fields or remove the empty fields");
    }
  };

  return (
    <div className="w-[80%] m-auto pb-10">
      <div>
        <label htmlFor="">What are the benefits of this course?</label>
        {benefits?.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              name="Benefit"
              placeholder="Type the benefit here"
              required
              className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
              value={item.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
            <GrFormClose
              onClick={() => handleRemoveBenefit(index)}
              className="text-red-500 ml-2 cursor-pointer"
            />
          </div>
        ))}
        <GrAddCircle
          onClick={handleAddBenefit}
          className="text-3xl mt-2 cursor-pointer"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="">
          What you need to know before taking this course?
        </label>
        {prerequisites?.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              name="Prerequisite"
              placeholder="Type the prerequisite here"
              required
              className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
              value={item.title}
              onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
            />
            <GrFormClose
              onClick={() => handleRemovePrerequisite(index)}
              className="text-red-500 ml-2 cursor-pointer"
            />
          </div>
        ))}
        <GrAddCircle
          onClick={handleAddPrerequisite}
          className="text-3xl mt-2 cursor-pointer"
        />
      </div>

      <div className="w-full flex items-center justify-start gap-5 mt-4">
        <button
          type="submit"
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

export default CourseDataEdit;
