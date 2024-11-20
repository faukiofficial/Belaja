import React from 'react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import BannerImage from '/banner.png';

const Hero: React.FC = () => {
  return (
    <div className="w-full 1000px:flex items-center relative bg-slate-100 dark:bg-gray-900 p-4 1000px:py-[200px]">
      <div className="1000px:w-[40%] flex items-center justify-center 1000px:justify-end pt-[100px] 1000px:pt-0 z-10">
        <img
          src={BannerImage}
          alt="banner"
          className="object-contain w-[80%] 800px:w-[60%] 1000px:w-[90%] 1500px:max-w-[85%] h-auto"
        />
      </div>

      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-0 text-center 1000px:text-left mt-[80px] 1000px:pl-8">
        <h2 className="dark:text-white text-[#000000c7] text-[24px] 600px:text-[30px] 1000px:text-[48px] 1300px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin py-2 leading-snug 1000px:leading-[1.2] w-full 1000px:w-[85%] 1200px:w-[75%] 1500px:w-[60%]">
          Improve your online learning experience with our platform
        </h2>

        <p className="dark:text-white text-[#000000c7] text-[14px] 600px:text-[16px] 1000px:text-[18px] font-Josefin font-[500] mt-4 w-full 1000px:w-[85%] 1200px:w-[75%] 1500px:w-[60%]">
          We have 40k+ online courses with more than 1000+ hours of content. Learn from the pros with lifetime access.
        </p>

        <div className="w-full 1000px:w-[85%] 1200px:w-[75%] 1500px:w-[60%] h-[50px] bg-transparent relative mt-6">
          <input
            type="search"
            placeholder="Search courses"
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] placeholder:text-[#000000c7] border-[#000000c7] text-[#000000c7] dark:text-[#ffffffdd] rounded-[5px] p-2 pr-[50px] w-full h-full outline-none font-Josefin font-[500] text-[14px] 600px:text-[16px]"
          />
          <div className="absolute flex items-center justify-center w-[50px] h-[50px] top-0 right-0 cursor-pointer dark:bg-[#39c1f3] bg-[#3999f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={24} />
          </div>
        </div>

        <div className="w-full 1000px:w-[85%] 1200px:w-[75%] 1500px:w-[60%] flex items-center mt-6">
          <div className="dark:text-white text-[#000000c7] text-[14px] 600px:text-[16px] font-Josefin font-[500] w-full text-center 1000px:text-left">
            <span>100k+ students are learning on Belaja.</span>{" "}
            <Link to="/courses" className="dark:text-[#39c1f3] text-[#3999f3] font-[600]">
              View all courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
