import { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";
import { useAuth } from "../../../Hooks/useAuth";

export default function ManageStudents() {
  const { currentUser } = useAuth();

  const allCourses = JSON.parse(localStorage.getItem("courses")) || [];
  const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
  const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  const myCourseTitles = allCourses
    .filter(
      (c) =>
        c.instructorEmail === currentUser?.email ||
        c.instructorName === currentUser?.name ||
        c.instructor === currentUser?.name
    )
    .map((c) => c.title);

  const studentsFromEnrollments = enrollments
    .filter(
      (item) =>
        item.instructorEmail === currentUser?.email ||
        item.instructorName === currentUser?.name ||
        myCourseTitles.includes(item.courseTitle)
    )
    .map((item) => ({
      id: item.id || Date.now(),
      studentName: item.studentName || "Student",
      studentEmail: item.studentEmail || "N/A",
      courseTitle: item.courseTitle || "Course",
      enrolledAt: item.enrolledAt || "2026-11-02",
    }));

  const myEnrolledCourses = enrolledCourses.filter((course) =>
    myCourseTitles.includes(course.title)
  );

  const studentsFromCourses = myEnrolledCourses.flatMap((course, cIdx) => {
    const studentsWhoBought = allUsers.filter((u) => u.role === "student");
    return studentsWhoBought.map((student, sIdx) => ({
      id: `${course.id}-${student.id || sIdx}-${cIdx}`,
      studentName: student.name || "Student",
      studentEmail: student.email,
      courseTitle: course.title,
      enrolledAt: "2026-11-02",
    }));
  });

  const combinedStudents = [...studentsFromEnrollments, ...studentsFromCourses];

  const initialList = combinedStudents.filter(
    (v, i, a) =>
      a.findIndex(
        (t) => t.courseTitle === v.courseTitle && t.studentEmail === v.studentEmail
      ) === i
  );

  const [studentsList, setStudentsList] = useState(initialList);

  const handleDelete = (studentEmail, courseTitle) => {
    const updatedList = studentsList.filter(
      (s) => !(s.studentEmail === studentEmail && s.courseTitle === courseTitle)
    );
    setStudentsList(updatedList);

    const updatedEnrollments = enrollments.filter(
      (item) => !(item.studentEmail === studentEmail && item.courseTitle === courseTitle)
    );
    localStorage.setItem("enrollments", JSON.stringify(updatedEnrollments));

    const updatedEnrolledCourses = enrolledCourses.filter(
      (c) => !(c.title === courseTitle)
    );
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedEnrolledCourses));

    toast.success("Student removed successfully");
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Enrolled Students
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        List of students who purchased your courses
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Student Email</TableCell>
              <TableCell>Course Title</TableCell>
              <TableCell>Enrollment Date</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No enrolled students found for your courses.
                </TableCell>
              </TableRow>
            ) : (
              studentsList.map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.studentName}</TableCell>
                  <TableCell>{item.studentEmail}</TableCell>
                  <TableCell>{item.courseTitle}</TableCell>
                  <TableCell>{item.enrolledAt}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      color="error"
                      variant="text"
                      onClick={() => handleDelete(item.studentEmail, item.courseTitle)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}