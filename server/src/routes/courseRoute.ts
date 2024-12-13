import express from "express";
const courseRouter = express.Router();
import {
  uploadCourse,
  editCourse,
  getSingleCourse,
  getAllCourses,
  getCourseByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
  getAllCoursesForAdmin,
  deleteCourse,
  getNewFiveCourses,
} from "../controllers/courseController";
import { validateUserRole } from "../middlewares/validateUserRole";
import { authenticateAndRefreshToken } from "../middlewares/authenticateAndRefreshToken ";

courseRouter.post(
  "/upload-course",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  uploadCourse
); // done
courseRouter.get("/get-courses", getAllCourses); // done
courseRouter.get("/get-new-five-courses", getNewFiveCourses);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.put(
  "/edit-course/:id",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  editCourse
);
courseRouter.get(
  "/get-course-content/:id",
  authenticateAndRefreshToken,
  getCourseByUser
);
courseRouter.put("/add-question", authenticateAndRefreshToken, addQuestion);
courseRouter.put("/add-answer", authenticateAndRefreshToken, addAnswer);
courseRouter.put("/add-review/:id", authenticateAndRefreshToken, addReview);
courseRouter.put(
  "/add-reply",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  addReplyToReview
);
courseRouter.get(
  "/get-courses-for-admin",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  getAllCoursesForAdmin
);
courseRouter.delete(
  "/delete-course/:id",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  deleteCourse
);

export default courseRouter;
