import { useState } from "react";
import { useUsers } from "../../../Hooks/useUsers";
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

export default function ManageInstructors() {
  const { allUsers, deleteUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const instructors = allUsers.filter((u) => u.role === "instructor");

  return (
    <>
      <Box>
        <Typography variant="h3">Manage Instructors</Typography>
        <Divider sx={{ p: 2 }}>where to manage instructors</Divider>
        <TableContainer sx={{ width: "100%", overflowX: "scroll", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {instructors.map((user, idx) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        color="info"
                        onClick={() => (
                          setSelectedUser(user),
                          setOpenModal(true)
                        )}
                      >
                        View
                      </Button>
                      <Button
                        color="error"
                        onClick={() => deleteUser(user.id)}
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
          {selectedUser && (
            <>
              <Typography variant="h3">{selectedUser.name}</Typography>
              <Typography variant="body1" sx={{ my: 1 }}>
                Email: {selectedUser.email}
              </Typography>
              <Typography variant="body2">Role: {selectedUser.role}</Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button onClick={() => setOpenModal(false)}>Close</Button>
                <Button
                  color="error"
                  onClick={() => (
                    deleteUser(selectedUser.id), setOpenModal(false)
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