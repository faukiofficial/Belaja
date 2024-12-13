import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCourseById } from "../../redux/slices/courseSlice";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { IoCheckmarkSharp, IoCloseOutline } from "react-icons/io5";
import CoursePlayer from "../../utils/CoursePlayer";
import Ratings from "../../utils/Ratings";
import { Skeleton } from "@mui/material";
import { newPayment } from "../../redux/slices/orderSlice";

const CourseDetail = () => {
  const dispatch = useAppDispatch();
  const { course, getCourseLoading } = useAppSelector((state) => state.course);
  const { userInfo } = useAppSelector((state) => state.user);
  const { newPaymentLoading } = useAppSelector((state) => state.order);
  const [open, setOpen] = useState(false);


  const { id } = useParams();

  useEffect(() => {
    dispatch(getCourseById(id as string));
  }, [dispatch, id]);

  const discount = Math.floor(
    ((course?.estimatedPrice - course?.price) / course?.estimatedPrice) * 100
  );

  const isPurchased = userInfo?.courses.includes(course?._id);

  const handleBuy = async () => {
    if (course) {
      const amount = Math.round(course.price * 100); // Amount in the smallest currency unit (e.g., cents)
      const paymentType = "bsi"; // Ensure this matches the expected type for the controller
  
      try {
        const transaction = await dispatch(
          newPayment({ orderId: course._id, grossAmount: amount, paymentType })
        );
  
        if (transaction.payload && transaction.payload.token) {
          // Open the Midtrans payment popup here
          window.snap.pay(transaction.payload.token, {
            onSuccess: function (result) {
              alert("Payment success");
              console.log(result);
              setOpen(false);
            },
            onPending: function (result) {
              alert("Payment pending");
              console.log(result);
            },
            onError: function (result) {
              alert("Payment failed");
              console.log(result);
            },
            onClose: function () {
              alert("Payment window closed");
            },
          });
        }
      } catch (error) {
        console.error("Payment failed:", error);
        alert("An error occurred while processing the payment. Please try again.");
      }
    }
  };  

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 w-full text-black dark:text-white">
      <Header />
      {getCourseLoading ? (
        <div className="w-[90%] 1000px:w-[80%] mx-auto py-20">
          <Skeleton variant="text" width="70%" height={40} />
          <Skeleton variant="text" width="50%" height={30} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            className="my-5"
          />
          <div className="flex flex-col gap-5">
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </div>
          <div className="mt-10">
            <Skeleton variant="rectangular" width="100%" height={200} />
          </div>
        </div>
      ) : (
        <>
          <div className="w-[90%] 1000px:w-[80%] mx-auto py-20 ">
            <div className="flex items-start justify-between mt-10 gap-5 flex-col-reverse 1000px:flex-row">
              <div className="">
                <h1 className="text-[30px] font-semibold">{course?.name}</h1>
                <p className="my-5">{course?.description}</p>

                <div className="flex items-start justify-between gap-5 text-sm">
                  <div className="flex items-center gap-3">
                    <Ratings rating={course?.ratings || 0} />
                    <span>{course?.reviews.length} Reviews</span>
                  </div>
                  <span>{course?.purchased} Students</span>
                </div>

                <h2 className="text-[25px] font-semibold mt-10">
                  What you will learn
                </h2>
                {course?.benefits.map((benefit) => (
                  <div
                    key={benefit._id}
                    className="flex items-center gap-3 mt-3"
                  >
                    <IoCheckmarkSharp size={20} className="text-green-500" />
                    <p>{benefit.title}</p>
                  </div>
                ))}

                <h2 className="text-[25px] font-semibold mt-10">
                  Requirements
                </h2>
                {course?.prerequisites.map((prerequisite) => (
                  <div
                    key={prerequisite._id}
                    className="flex items-center gap-3 mt-3"
                  >
                    <IoCheckmarkSharp size={20} className="text-green-500" />
                    <p>{prerequisite.title}</p>
                  </div>
                ))}
              </div>

              <div className="w-full 1000px:w-[50%] min-w-[350px] relative">
                <div className="w-full">
                  <CoursePlayer videoUrl={course?.demoUrl as string} title="" />
                </div>
                <div className="flex items-center mt-5">
                  <h1 className="text-[25px]">
                    {course?.price === 0 ? "Free" : `Rp. ${course?.price}`}
                  </h1>
                  <h5 className="pl-3 text-[20px] line-through opacity-80">
                    {`Rp. ${course?.estimatedPrice}`}
                  </h5>
                  <h4 className="pl-5 text-[22px] text-red-500">
                    {discount}% Off
                  </h4>
                </div>
                <div className="mt-5">
                  {isPurchased ? (
                    <Link
                      to={`/course-access/${course?._id}`}
                      className="bg-green-500 text-white py-2 px-5 rounded hover:bg-green-600"
                    >
                      Learn Now
                    </Link>
                  ) : (
                    <button
                      className="bg-red-500 text-white py-2 px-5 rounded hover:bg-red-600"
                      onClick={handleBuy}
                      disabled={newPaymentLoading}
                    >
                      Buy Now
                    </button>
                  )}
                  <div>
                    <p className="text-sm mt-3">- Source Code Included</p>
                    <p className="text-sm mt-3">- Lifetime Access</p>
                    <p className="text-sm mt-3">
                      - Certification of completion
                    </p>
                    <p className="text-sm mt-3">- Premium support</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-[25px] font-semibold mt-10">Course Content</h2>
            <span>Total Videos: {course?.totalVideos}</span>
            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {course?.courseData.map((content, index) => (
                <li
                  key={content._id}
                  className="flex justify-between mt-2 border border-slate-400 p-2 rounded"
                >
                  <span>
                    {index + 1}. {content.title}
                  </span>
                  <span>{content.videoLength} min</span>
                </li>
              ))}
            </ul>

            <h2 className="text-[25px] font-semibold mt-10">Reviews</h2>
            <div className="mt-5">
              {course?.reviews && course?.reviews.length > 0 &&
                course?.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="flex items-center justify-between gap-5"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={review.user.avatar.url}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3>{review.user.name}</h3>
                        <Ratings rating={review.rating || 0} />
                      </div>
                    </div>
                    <p>{review.review}</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      <>
        {open && (
          <div className="w-full h-screen bg-transparent fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black dark:text-gray-400 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
              </div>
            </div>
          </div>
        )}
      </>

      <Footer />
    </div>
  );
};

export default CourseDetail;
