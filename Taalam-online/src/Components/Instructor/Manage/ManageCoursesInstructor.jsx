import { useState } from "react";
import { useCourses } from "../../../Hooks/useCourses";
import { useAuth } from "../../../Hooks/useAuth";
import {
  Box,
  Button,
  Divider,
  Modal,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

export default function ManageCoursesInstructor() {
  const { courses, deleteCourse } = useCourses();
  const { currentUser } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const myCourses = courses.filter(
    (c) => c.instructorName === currentUser?.name || c.instructorEmail === currentUser?.email
  );

  const avgRating =
    myCourses.length > 0
      ? (myCourses.reduce((acc, curr) => acc + (curr.rating || 5), 0) / myCourses.length).toFixed(1)
      : 5.0;

  return (
    <>
      <Box>
        <Typography variant="h3">Manage My Courses</Typography>
        <Divider sx={{ p: 2 }}>where to manage courses</Divider>

        <Card sx={{ my: 2, maxWidth: 300, bgcolor: "action.hover" }}>
          <CardContent>
            <Typography variant="h6">My Instructor Rating</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Rating value={Number(avgRating)} precision={0.1} readOnly />
              <Typography variant="body1">({avgRating} / 5)</Typography>
            </Box>
          </CardContent>
        </Card>

        <TableContainer sx={{ width: "100%", overflowX: "scroll", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {myCourses.map((course, idx) => {
                return (
                  <TableRow key={course.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>${course.price}</TableCell>
                    <TableCell>
                      <Rating value={course.rating || 5} size="small" readOnly />
                    </TableCell>
                    <TableCell>
                      <Button
                        color="info"
                        onClick={() => (
                          setSelectedCourse(course), setOpenModal(true)
                        )}
                      >
                        View
                      </Button>
                      <Button
                        color="error"
                        onClick={() => deleteCourse(course.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          {selectedCourse && (
            <>
              <Typography variant="h3">{selectedCourse.title}</Typography>
              <Typography variant="body1" sx={{ my: 1 }}>
                Category: {selectedCourse.category}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {selectedCourse.description}
              </Typography>
              <Typography variant="h6" color="primary">
                Price: ${selectedCourse.price}
              </Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button onClick={() => setOpenModal(false)}>Close</Button>
                <Button
                  color="error"
                  onClick={() => (
                    deleteCourse(selectedCourse.id), setOpenModal(false)
                  )}
                >
                  Delete
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}