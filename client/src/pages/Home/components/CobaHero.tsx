import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CobaHero = () => {
  const navigate = useNavigate()
  const [searchQuery, setsearchQuery] = useState("")
  
  return (
    <>
      <section className="relative pt-24 bg-slate-100 dark:bg-gray-900 sm:pt-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full bg-slate-100 dark:bg-gray-900 " />
        </div>

        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl font-Josefin">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-bold dark:text-white text-[#000000c7] sm:text-4xl lg:text-5xl">
              Improve your online learning experience with our platform
            </h1>
            <p className="max-w-md mx-auto mt-6 text-base font-normal leading-7 text-gray-500 dark:text-gray-400">
              We have 40k+ online courses with more than 1000+ hours of content.
              Learn from the pros with lifetime access.
            </p>

            <form
              action="#"
              method="POST"
              className="max-w-md mx-auto mt-8 space-y-4 sm:space-x-4 sm:flex sm:space-y-0 sm:items-end"
            >
              <div className="flex-1">
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="block w-full px-4 py-3 sm:py-3.5 font-Poppins text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                    placeholder="Search course"
                    onChange={(e) => setsearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute transitiona-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>

                <button
                  type="button"
                  onClick={() => navigate(`/courses?search=${encodeURIComponent(searchQuery)}`)}
                  className="inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center text-center mt-6 sm:gap-2">
              <span className="dark:text-white text-[#000000c7]">
                100k+ students are learning on Belaja.
              </span>{" "}
              <Link
                to="/courses"
                className="dark:text-[#39c1f3] text-[#3999f3] font-[600]"
              >
                View all courses
              </Link>
            </div>
          </div>

          <h1 className="text-center font-Josefin text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[50px] text-black font-[700] tracking-tight mt-20">
            Expand Your Career{" "}
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] bg-clip-text text-transparent">
              Opportunity
            </span>{" "}
            <br />
            with{" "}
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] bg-clip-text text-transparent">
              Belaja.
            </span>
          </h1>
        </div>

        
      </section>
    </>
  );
};

export default CobaHero;
