import { Box, Card, CardContent, Divider, Rating, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useCourses } from "../../../Hooks/useCourses";
import { useAuth } from "../../../Hooks/useAuth";

export default function InstructorRatings() {
  const { courses } = useCourses();
  const { currentUser } = useAuth();

  const myCourses = courses.filter(
    (c) => c.instructorName === currentUser?.name || c.instructorEmail === currentUser?.email
  );

  const avgRating =
    myCourses.length > 0
      ? (myCourses.reduce((acc, curr) => acc + (curr.rating || 5), 0) / myCourses.length).toFixed(1)
      : 5.0;

  return (
    <Box>
      <Typography variant="h3">Ratings & Reviews</Typography>
      <Divider sx={{ p: 2 }}>your overall ratings and course feedback</Divider>

      <Card sx={{ my: 3, maxWidth: 350, bgcolor: "action.hover" }}>
        <CardContent>
          <Typography variant="h6">Overall Rating</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Rating value={Number(avgRating)} precision={0.1} readOnly />
            <Typography variant="h6">({avgRating} / 5)</Typography>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>

              <TableCell>Course Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myCourses.map((course, idx) => (
              <TableRow key={course.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating value={course.rating || 5} precision={0.1} size="small" readOnly />
                    <span>({course.rating || 5.0})</span>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}