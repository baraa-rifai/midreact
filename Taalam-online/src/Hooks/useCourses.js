import { useContext } from "react";
import { CourseContext } from "../Context/CourseContext";

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("no course provider!");
  }
  return context;
};