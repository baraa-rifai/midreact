import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  Box,
  Divider,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { useMessages } from "../Hooks/useMessages";
import toast from "react-hot-toast";

export default function MyCourses() {
  const { currentUser } = useAuth();
  const { announcements } = useMessages();

  const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];

  const myEnrolledCourses = enrollments.filter(
    (item) => item.studentEmail === currentUser?.email
  );

  const [ratings, setRatings] = useState({});

  const handleRatingChange = (courseId, newValue) => {
    setRatings((prev) => ({ ...prev, [courseId]: newValue }));
    toast.success("Thank you for your rating!");
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 1 }}>
        My Courses
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mb: 4 }}>
        your active learning courses
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {/* قسم الإعلانات والأنباء من المدرسين */}
      {announcements && announcements.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            📢 Course Announcements
          </Typography>
          <Stack spacing={2}>
            {announcements.map((ann) => (
              <Alert severity="info" key={ann.id} sx={{ borderRadius: 2 }}>
                <AlertTitle sx={{ fontWeight: "bold" }}>
                  {ann.title} — <small>By {ann.instructorName} ({ann.date})</small>
                </AlertTitle>
                {ann.content}
              </Alert>
            ))}
          </Stack>
        </Box>
      )}

      {myEnrolledCourses.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          You have not enrolled in any courses yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {myEnrolledCourses.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <CardContent>
                  <Chip label={item.courseCategory || "Web Development"} color="primary" size="small" sx={{ mb: 1 }} />
                  <Typography variant="h5">{item.courseTitle}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {item.courseDescription || "Learn basic React concepts, state management, and props."}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 2, color: "text.secondary" }}>
                    Instructor: {item.instructorName}
                  </Typography>

                  <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="caption">Rate Course:</Typography>
                    <Rating
                      value={ratings[item.id] || 5}
                      onChange={(e, newValue) => handleRatingChange(item.id, newValue)}
                    />
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2 }}>
                  <Button variant="contained" color="success" fullWidth>
                    CONTINUE LEARNING
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}