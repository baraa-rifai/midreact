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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Divider,
  MenuItem,
  Grid,
} from "@mui/material";
import { useMessages } from "../../Hooks/useMessages";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";

export default function Messages({ title = "Messages", onlyAdmin = false }) {
  const { messages, sendMessage, replyToMessage, deleteMessage } = useMessages();
  const { currentUser } = useAuth();

  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [openNewMsg, setOpenNewMsg] = useState(false);

  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
  const allCourses = JSON.parse(localStorage.getItem("courses")) || [];
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  const getAvailableRecipients = () => {
    if (currentUser?.role === "instructor") {
      const myCourseTitles = allCourses
        .filter(
          (c) =>
            c.instructorEmail === currentUser?.email ||
            c.instructorName === currentUser?.name ||
            c.instructor === currentUser?.name
        )
        .map((c) => c.title);

      const myStudents = enrollments
        .filter(
          (e) =>
            e.instructorEmail === currentUser?.email ||
            myCourseTitles.includes(e.courseTitle)
        )
        .map((e) => ({
          name: e.studentName,
          email: e.studentEmail,
          role: "student",
          label: `Student: ${e.studentName} (${e.studentEmail})`,
        }));

      const uniqueStudents = myStudents.filter(
        (v, i, a) => a.findIndex((t) => t.email === v.email) === i
      );

      const adminOption = {
        name: "System Admin",
        email: "admin@taalam.com",
        role: "admin",
        label: "System Admin (admin@taalam.com)",
      };

      return [adminOption, ...uniqueStudents];
    }

    if (currentUser?.role === "admin") {
      return allUsers
        .filter((u) => u.role === "instructor")
        .map((u) => ({
          name: u.name,
          email: u.email,
          role: "instructor",
          label: `Instructor: ${u.name} (${u.email})`,
        }));
    }

    return [];
  };

  const recipients = getAvailableRecipients();

  const filteredMessages = messages.filter((msg) => {
    if (onlyAdmin || title.toLowerCase().includes("admin")) {
      return msg.senderRole === "admin" || msg.receiverRole === "admin";
    }
    return (
      msg.senderEmail === currentUser?.email ||
      msg.receiverEmail === currentUser?.email ||
      (currentUser?.role === "admin" && msg.receiverRole === "admin")
    );
  });

  const handleOpenMsg = (msg) => {
    setSelectedMsg(msg);
    setReplyText(msg.reply || "");
  };

  const handleCloseMsg = () => {
    setSelectedMsg(null);
    setReplyText("");
  };

  const handleSendReply = () => {
    if (selectedMsg) {
      replyToMessage(selectedMsg.id, replyText);
      handleCloseMsg();
    }
  };

  const handleDelete = (id) => {
    deleteMessage(id);
    if (selectedMsg?.id === id) {
      handleCloseMsg();
    }
  };

  const handleCreateMessage = (e) => {
    e.preventDefault();
    if (!selectedRecipient || !subject || !content) {
      toast.error("Please fill all fields!");
      return;
    }

    const recipientObj = recipients.find((r) => r.email === selectedRecipient);

    sendMessage({
      senderEmail: currentUser?.email || "user@taalam.com",
      senderName: currentUser?.name || "User",
      senderRole: currentUser?.role || "instructor",
      receiverEmail: recipientObj?.email || "",
      receiverRole: recipientObj?.role || "",
      subject,
      content,
    });

    setSubject("");
    setContent("");
    setSelectedRecipient("");
    setOpenNewMsg(false);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            manage your received and sent messages
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={() => setOpenNewMsg(true)}>
          NEW MESSAGE
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMessages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMessages.map((msg, index) => (
                <TableRow key={msg.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{msg.senderName || msg.senderEmail}</TableCell>
                  <TableCell>{msg.receiverEmail || msg.receiverRole}</TableCell>
                  <TableCell>{msg.subject}</TableCell>
                  <TableCell>{msg.date}</TableCell>
                  <TableCell align="right">
                    <Button variant="text" color="primary" onClick={() => handleOpenMsg(msg)}>
                      VIEW
                    </Button>
                    <Button variant="text" color="error" onClick={() => handleDelete(msg.id)}>
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(selectedMsg)} onClose={handleCloseMsg} fullWidth maxWidth="sm">
        {selectedMsg && (
          <>
            <DialogTitle>Message Details</DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle2" color="text.secondary">
                From: {selectedMsg.senderName} ({selectedMsg.senderEmail})
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                To: {selectedMsg.receiverEmail || selectedMsg.receiverRole} ({selectedMsg.date})
              </Typography>
              <Typography variant="h6" sx={{ my: 1 }}>
                Subject: {selectedMsg.subject}
              </Typography>
              <Box sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1, my: 2 }}>
                <Typography variant="body1">{selectedMsg.content}</Typography>
              </Box>

              <TextField
                label="Reply / Answer"
                multiline
                rows={3}
                fullWidth
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                sx={{ mt: 1 }}
              />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
              <Button color="error" variant="text" onClick={() => handleDelete(selectedMsg.id)}>
                Delete Message
              </Button>
              <Box>
                <Button onClick={handleCloseMsg} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSendReply}>
                  Save Reply
                </Button>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={openNewMsg} onClose={() => setOpenNewMsg(false)} fullWidth maxWidth="sm">
        <DialogTitle>Send New Message</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                select
                label="Select Recipient"
                fullWidth
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
              >
                {recipients.length === 0 ? (
                  <MenuItem disabled value="">
                    No recipients available
                  </MenuItem>
                ) : (
                  recipients.map((r, idx) => (
                    <MenuItem key={idx} value={r.email}>
                      {r.label}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Subject"
                fullWidth
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message Content"
                multiline
                rows={4}
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewMsg(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateMessage}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}