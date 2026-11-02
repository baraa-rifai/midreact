import { useState } from "react";
import { useCourses } from "../../../Hooks/useCourses";
import {
  Box,
  Button,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function ManageCourses() {
  const { courses, deleteCourse } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box>
        <Typography variant="h3">Manage Courses</Typography>
        <Divider sx={{ p: 2 }}>where to manage courses</Divider>
        <TableContainer sx={{ width: "100%", overflowX: "scroll", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {courses.map((course, idx) => {
                return (
                  <TableRow key={course.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>${course.price}</TableCell>
                    <TableCell>
                      <Button
                        color="info"
                        onClick={() => (
                          setSelectedCourse(course),
                          setOpenModal(true)
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

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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