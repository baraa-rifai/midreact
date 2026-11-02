import { Card, CardContent, Typography, CardActions, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import toast from "react-hot-toast";

export default function CourseCard({ course, onDelete, onEdit }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBuy = () => {
    if (!currentUser) {
      toast.error("Please login first to enroll!");
      navigate("/login");
      return;
    }

    if (currentUser.role !== "student") {
      toast.error("Instructors and Admins cannot purchase courses!");
      return;
    }

    const existingEnrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
    
    const isAlreadyEnrolled = existingEnrollments.some(
      (item) => item.studentEmail === currentUser.email && (item.courseId === course.id || item.courseTitle === course.title)
    );

    if (isAlreadyEnrolled) {
      toast.error("You are already enrolled in this course!");
      navigate("/my-courses");
      return;
    }

    const newEnrollment = {
      id: Date.now(),
      courseId: course.id,
      courseTitle: course.title,
      courseDescription: course.description,
      courseCategory: course.category,
      studentName: currentUser.name || "Student",
      studentEmail: currentUser.email,
      instructorEmail: course.instructorEmail || "instructor@taalam.com",
      instructorName: course.instructorName || "Baraa Al-Rifai",
      enrolledAt: new Date().toISOString().split("T")[0],
    };

    const updatedEnrollments = [...existingEnrollments, newEnrollment];
    localStorage.setItem("enrollments", JSON.stringify(updatedEnrollments));

    toast.success("Course purchased successfully!");
    navigate("/my-courses");
  };

  const isInstructorOrAdmin = currentUser && (currentUser.role === "instructor" || currentUser.role === "admin");

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Chip label={course.category || "General"} color="primary" size="small" sx={{ mb: 1 }} />
        <Typography variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {course.description}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 2, color: "text.secondary" }}>
          Instructor: {course.instructorName || "Baraa Al-Rifai"}
        </Typography>
        <Typography variant="h6" color="secondary" sx={{ mt: 1 }}>
          ${course.price}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2 }}>
        {onDelete || onEdit ? (
          <>
            {onEdit && (
              <Button size="small" color="primary" onClick={() => onEdit(course)}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button size="small" color="error" onClick={() => onDelete(course.id)}>
                Delete
              </Button>
            )}
          </>
        ) : (
          !isInstructorOrAdmin && (
            <Button size="small" variant="contained" fullWidth onClick={handleBuy}>
              Buy Now
            </Button>
          )
        )}
      </CardActions>
    </Card>
  );
}