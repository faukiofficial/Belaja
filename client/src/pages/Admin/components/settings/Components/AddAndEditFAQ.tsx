import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  createLayout,
  editLayout,
  FAQ,
  getFAQ,
} from "../../../../../redux/slices/layoutSlice";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

const AddAndEditFAQ = () => {
  const [questions, setQuestions] = useState<FAQ[]>([]);

  const dispatch = useAppDispatch();
  const { faq, editLayoutLoading } = useAppSelector((state) => state.layout);

  useEffect(() => {
    dispatch(getFAQ({ type: "FAQ" }));
  }, [dispatch]);

  useEffect(() => {
    setQuestions(faq);
  }, [faq]);

  const toggleQuestion = (id: string) => {
    const updatedQuestions = questions.map(
      (item: { _id: string; active: boolean }) => {
        if (item._id === id) {
          return { ...item, active: !item.active };
        }
        return item;
      }
    );
    setQuestions(updatedQuestions as FAQ[]);
  };

  const handleQuestionChange = (id: string, value: string) => {
    const updatedQuestions = questions.map(
      (item: {
        _id: string;
        question: string;
        answer: string;
        active: boolean;
      }) => {
        if (item._id === id) {
          return { ...item, question: value };
        }
        return item;
      }
    );
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (id: string, value: string) => {
    const updatedQuestions = questions.map(
      (item: {
        _id: string;
        question: string;
        answer: string;
        active: boolean;
      }) => {
        if (item._id === id) {
          return { ...item, answer: value };
        }
        return item;
      }
    );
    setQuestions(updatedQuestions);
  };

  const addNewQuestionHandler = () => {
    const newQuestion: FAQ = {
      _id: `temp-${Date.now()}`,
      question: "",
      answer: "",
      active: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSave = async () => {
    if (
      questions.some(
        (item: { question: string; answer: string }) =>
          !item.question.trim() || !item.answer.trim()
      )
    ) {
      toast.error(
        "Please fill in all question and answer inputs before saving."
      );
      return;
    }

    const data = {
      type: "FAQ",
      categories: [],
      faq: questions.map((item: FAQ) => ({
        _id: item._id,
        question: item.question,
        answer: item.answer,
        active: item.active,
      })),
    };

    try {
      if (questions.some((item: FAQ) => item._id)) {
        await dispatch(editLayout(data)).then(() => {
          toast.success("FAQ updated successfully");
        });
      } else {
        await dispatch(createLayout(data)).then(() => {
          toast.success("FAQ created successfully");
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save FAQ");
    }
  };

  return (
    <div>
      <div className="w-[90%] m-auto 800px:w-[80%] mt-[120px]">
        <h2 className="dark:text-white text-[#000000c7] text-[24px] 600px:text-[30px] 1000px:text-[48px] 1300px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin py-2 leading-snug w-full">
          Add and Edit FAQs
        </h2>
        <div>
          <dl className="space-y-8">
            {questions?.map(
              (item: {
                _id: string;
                question: string;
                answer: string;
                active: boolean;
              }) => (
                <div key={item._id} className="pt-6">
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(item._id)}
                    >
                      <input
                        className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={item.question}
                        onChange={(e) =>
                          handleQuestionChange(item._id, e.target.value)
                        }
                        placeholder="Add the question . . ."
                      />

                      <span className="ml-6 flex-shrink-0">
                        {item.active ? (
                          <HiMinus className="w-6 h-6" />
                        ) : (
                          <HiPlus className="w-6 h-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {item.active && (
                    <dd className="mt-2 pr-12">
                      <input
                        className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={item.answer}
                        onChange={(e) =>
                          handleAnswerChange(item._id, e.target.value)
                        }
                        placeholder="Add the answer . . ."
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="text-[18px] dark:text-white text-black cursor-pointer"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter(
                                (question) => question._id !== item._id
                              )
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              )
            )}
          </dl>

          <IoMdAddCircleOutline
            className="text-[35px] dark:text-white text-black mt-10 cursor-pointer"
            onClick={addNewQuestionHandler}
          />
        </div>

        <button
          className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          onClick={handleSave}
        >
          {editLayoutLoading ? "Saving..." : "Save FAQ"}
        </button>
      </div>
    </div>
  );
};

export default AddAndEditFAQ;
