import { useState } from "react";
import toast from "react-hot-toast";
import { CourseContext } from "./CourseContext";

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(
    JSON.parse(localStorage.getItem("courses")) || [
      {
        id: 1,
        title: "React.js Essentials",
        description: "Learn basic React concepts, state management, and props.",
        price: "29.99",
        category: "Web Development",
        instructorName: "Baraa Alrifai",
      },
    ]
  );

  const getCourses = () => {
    try {
      const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
      setCourses(storedCourses);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const addCourse = (courseData) => {
    try {
      if (!courseData.title || !courseData.price || !courseData.category) {
        toast.error("please fill all required fields!");
        return;
      }

      const newCourse = {
        id: Date.now(),
        title: courseData.title,
        description: courseData.description || "",
        price: courseData.price,
        category: courseData.category,
        instructorName: courseData.instructorName || "Instructor",
      };

      const newCoursesList = [...courses, newCourse];
      setCourses(newCoursesList);
      localStorage.setItem("courses", JSON.stringify(newCoursesList));
      toast.success("course added successfully");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const updateCourse = (id, updatedData) => {
    try {
      const updatedCoursesList = courses.map((course) =>
        course.id === id ? { ...course, ...updatedData } : course
      );
      setCourses(updatedCoursesList);
      localStorage.setItem("courses", JSON.stringify(updatedCoursesList));
      toast.success("course updated successfully");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const deleteCourse = (id) => {
    try {
      const filteredCourses = courses.filter((course) => course.id !== id);
      setCourses(filteredCourses);
      localStorage.setItem("courses", JSON.stringify(filteredCourses));
      toast.success("course deleted successfully");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        getCourses,
        addCourse,
        updateCourse,
        deleteCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};