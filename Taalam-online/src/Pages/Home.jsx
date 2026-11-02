import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../Hooks/useCourses";
import { useAuth } from "../Hooks/useAuth";
import CourseCard from "../Components/CourseCard";

export default function Home() {
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { currentUser } = useAuth();

  const handleActionClick = () => {
    if (!currentUser) {
      navigate("/register");
    } else if (currentUser.role === "admin") {
      navigate("/admin/dashboard");
    } else if (currentUser.role === "instructor") {
      navigate("/instructor/dashboard");
    } else {
      navigate("/my-courses");
    }
  };

  const getButtonLabel = () => {
    if (!currentUser) return "GET STARTED";
    if (currentUser.role === "admin") return "GO TO ADMIN PANEL";
    if (currentUser.role === "instructor") return "GO TO INSTRUCTOR DASHBOARD";
    return "GO TO MY COURSES";
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Taalam-online
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Learn from expert instructors or start teaching today.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleActionClick}
        >
          {getButtonLabel()}
        </Button>
      </Box>

      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Featured Courses
      </Typography>

      <Grid container spacing={3}>
        {courses &&
          courses.slice(0, 3).map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <CourseCard course={course} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}