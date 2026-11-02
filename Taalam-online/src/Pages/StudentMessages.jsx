import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Divider,
  Card,
  CardContent,
  Chip,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../Hooks/useAuth";
import { useMessages } from "../Hooks/useMessages";
import toast from "react-hot-toast";

export default function StudentMessages() {
  const { currentUser } = useAuth();
  const { messages, sendMessage, deleteMessage } = useMessages();

  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const allCourses = JSON.parse(localStorage.getItem("courses")) || [];

  const registeredInstructors = allUsers
    .filter((u) => u.role === "instructor")
    .map((u) => ({
      name: u.name,
      email: u.email,
    }));

  const courseInstructors = allCourses.map((c) => {
    const name = c.instructorName || c.instructor || "Instructor";
    const email = c.instructorEmail || `${name.toLowerCase().replace(/\s+/g, "")}@taalam.com`;
    return { name, email };
  });

  const rawInstructors = [...registeredInstructors, ...courseInstructors];

  const uniqueInstructors = [];
  const seenKeys = new Set();

  rawInstructors.forEach((ins) => {
    const key = ins.name.trim().toLowerCase();
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueInstructors.push(ins);
    }
  });

  const myMessages = messages.filter(
    (msg) => msg.senderEmail === currentUser?.email
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedInstructor || !subject || !content) {
      toast.error("Please fill all fields!");
      return;
    }

    const instructorObj = uniqueInstructors.find(
      (ins) => ins.email === selectedInstructor || ins.name === selectedInstructor
    );

    sendMessage({
      senderEmail: currentUser?.email || "student@taalam.com",
      senderName: currentUser?.name || "Student",
      senderRole: "student",
      receiverRole: "instructor",
      receiverEmail: instructorObj?.email || selectedInstructor,
      receiverName: instructorObj?.name || selectedInstructor,
      subject,
      content,
    });

    setSubject("");
    setContent("");
    setSelectedInstructor("");
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 1 }}>
        Contact Instructors
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mb: 4 }}>
        send questions and view replies
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Paper sx={{ p: 3, mb: 4, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Send New Message
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            select
            label="Select Instructor"
            fullWidth
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            sx={{ mb: 2 }}
          >
            {uniqueInstructors.length === 0 ? (
              <MenuItem disabled value="">
                No instructors available
              </MenuItem>
            ) : (
              uniqueInstructors.map((ins, idx) => (
                <MenuItem key={idx} value={ins.email}>
                  {ins.name}
                </MenuItem>
              ))
            )}
          </TextField>

          <TextField
            label="Subject"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Your Question / Message"
            multiline
            rows={4}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" color="primary">
            SEND MESSAGE
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ mb: 2 }}>
        My Sent Messages
      </Typography>

      {myMessages.length === 0 ? (
        <Typography color="text.secondary">No sent messages yet.</Typography>
      ) : (
        myMessages.map((msg) => (
          <Card key={msg.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Subject: {msg.subject}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {msg.date}
                </Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                To: {msg.receiverName || msg.receiverEmail}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                "{msg.content}"
              </Typography>

              {msg.reply ? (
                <Box sx={{ p: 1.5, bgcolor: "action.hover", borderLeft: "4px solid #2e7d32", borderRadius: 1, mb: 2 }}>
                  <Typography variant="caption" color="success.main" sx={{ fontWeight: "bold" }}>
                    Instructor Reply:
                  </Typography>
                  <Typography variant="body2">{msg.reply}</Typography>
                </Box>
              ) : (
                <Chip label="Waiting for reply" size="small" variant="outlined" color="warning" sx={{ mb: 2 }} />
              )}

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  color="error"
                  variant="text"
                  onClick={() => deleteMessage(msg.id)}
                >
                  DELETE
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}