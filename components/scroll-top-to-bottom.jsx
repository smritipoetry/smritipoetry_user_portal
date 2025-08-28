"use client";

import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-green-800 text-white p-1 rounded-full cursor-pointer shadow-lg hover:bg-green-700 transition"
    >
      <FaArrowAltCircleUp size={30} />
    </div>
  );
};

export default ScrollToTopButton;
