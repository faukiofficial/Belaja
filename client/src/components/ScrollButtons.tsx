import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState, useEffect } from "react";

const ScrollButtons = () => {
  const [showUpButtons, setShowUpButtons] = useState(false);
  const [showDownButton, setShowDownButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowUpButtons(true);
      } else {
        setShowUpButtons(false);
      }

      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition + windowHeight >= documentHeight) {
        setShowDownButton(false);
      } else {
        setShowDownButton(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showUpButtons && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-3 shadow-lg  transition cursor-pointer z-200"
        >
          <FaArrowUp />
        </button>
      )}
      {showDownButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-4 right-4 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-3 shadow-l transition cursor-pointer z-200"
        >
          <FaArrowDown />
        </button>
      )}
    </>
  );
};

export default ScrollButtons;
