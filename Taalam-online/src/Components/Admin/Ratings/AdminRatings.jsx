import { Box, Divider, Rating, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useUsers } from "../../../Hooks/useUsers";
import { useCourses } from "../../../Hooks/useCourses";

export default function AdminRatings() {
  const { allUsers } = useUsers();
  const { courses } = useCourses();

  const instructors = allUsers.filter((u) => u.role === "instructor");

  const getInstructorRating = (instructorName) => {
    const instCourses = courses.filter((c) => c.instructorName === instructorName);
    if (instCourses.length === 0) return 5.0;
    const avg = instCourses.reduce((acc, curr) => acc + (curr.rating || 5), 0) / instCourses.length;
    return avg.toFixed(1);
  };

  return (
    <Box>
      <Typography variant="h3">Instructors Ratings</Typography>
      <Divider sx={{ p: 2 }}>monitor all instructors ratings</Divider>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Instructor Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructors.map((user, idx) => {
              const rating = getInstructorRating(user.name);
              return (
                <TableRow key={user.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating value={Number(rating)} precision={0.1} size="small" readOnly />
                      <span>({rating} / 5)</span>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}