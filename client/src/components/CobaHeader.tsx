import { Link } from "react-router-dom";

const CobaHeader = () => {
  return (
    <>
      <section className="relative py-16 bg-white sm:py-24 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full bg-gray-100" />
        </div>

        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl font-Josefin">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Improve your online learning experience with our platform
            </h1>
            <p className="max-w-md mx-auto mt-6 text-base font-normal leading-7 text-gray-500">
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
                    className="block w-full px-4 py-3 sm:py-3.5 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                    placeholder="Search course"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute transitiona-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>

                <button
                  type="button"
                  className="inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center text-center mt-6 sm:gap-2">
              <span>100k+ students are learning on Belaja.</span>{" "}
              <Link
                to="/courses"
                className="dark:text-[#39c1f3] text-[#3999f3] font-[600]"
              >
                View all courses
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="flex w-full gap-6 pb-8 mt-12 overflow-x-auto sm:mt-16 lg:mt-20 snap-x">
          <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-5">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <img
                      className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                      src="https://media.gq.com.mx/photos/609c0fdeee4372271f0b9056/1:1/w_2000,h_2000,c_limit/salir%20guapo%20en%20fotos-605380757.jpg"
                      alt=""
                    />
                  </div>

                  <div className="flex-1 ml-4 lg:ml-6">
                    <div className="text-sm font-semibold text-gray-900 lg:text-lg group-hover:text-gray-600 mb-2">
                      "I love how easy it is to learn and track my progress
                      through this LMS. Highly recommended!"{" "}
                    </div>
                    <div className="text-xs font-medium text-gray-900 lg:text-sm">
                      Jane Smith{" "}
                    </div>
                    <p className="text-xs font-medium text-gray-500 lg:text-sm">
                      Data Analyst{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-5">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <img
                      className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                      src="https://static.vecteezy.com/system/resources/thumbnails/026/408/660/small/hipster-man-lifestyle-fashion-portrait-background-caucasian-isolated-modern-standing-t-shirt-white-model-student-smile-photo.jpg"
                      alt=""
                    />
                  </div>

                  <div className="flex-1 ml-4 lg:ml-6">
                    <div className="text-sm font-semibold text-gray-900 lg:text-lg group-hover:text-gray-600 mb-2">
                      "This platform has significantly improved my coding skills
                      with practical and interactive lessons."{" "}
                    </div>
                    <div className="text-xs font-medium text-gray-900 lg:text-sm">
                      Peter Parker
                    </div>
                    <p className="text-xs font-medium text-gray-500 lg:text-sm">
                      Web Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-5">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <img
                      className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                      src="https://static.vecteezy.com/system/resources/thumbnails/026/408/660/small/hipster-man-lifestyle-fashion-portrait-background-caucasian-isolated-modern-standing-t-shirt-white-model-student-smile-photo.jpg"
                      alt=""
                    />
                  </div>

                  <div className="flex-1 ml-4 lg:ml-6">
                    <div className="text-sm font-semibold text-gray-900 lg:text-lg group-hover:text-gray-600 mb-2">
                      "The courses are well-structured and perfect for
                      professionals looking to upskill efficiently."{" "}
                    </div>
                    <div className="text-xs font-medium text-gray-900 lg:text-sm">
                      Alex Johnson{" "}
                    </div>
                    <p className="text-xs font-medium text-gray-500 lg:text-sm">
                      Marketing Specialist{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-5">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <img
                      className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                      src="https://img.freepik.com/fotos-premium/hombre-caucasico-joven-aislado-pared-azul-pie-mano-extendida-mostrando-senal-stop-impidiendote_1187-126520.jpg"
                      alt=""
                    />
                  </div>

                  <div className="flex-1 ml-4 lg:ml-6">
                    <div className="text-sm font-semibold text-gray-900 lg:text-lg group-hover:text-gray-600 mb-2">
                      "The personalized learning paths helped me stay focused
                      and achieve my career goals faster."
                    </div>
                    <div className="text-xs font-medium text-gray-900 lg:text-sm">
                      Emily Davis
                    </div>
                    <p className="text-xs font-medium text-gray-500 lg:text-sm">
                      UX Designer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default CobaHeader;
