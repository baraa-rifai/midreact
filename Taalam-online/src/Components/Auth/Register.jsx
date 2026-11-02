import {
  Button,
  Container,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleSubmit = () => {
    register(userData);
  };

  return (
    <Container sx={{ my: "auto" }}>
      <Paper
        elevation={4}
        sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography variant="h3">Create account</Typography>
        <Divider>Start your journey</Divider>

        <TextField
          label="Enter Your Name"
          required
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />

        <TextField
          label="Enter Your Email"
          type="email"
          required
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />

        <TextField
          select
          label="Account Type"
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        >
          <MenuItem value="student">Student / Buyer</MenuItem>
          <MenuItem value="instructor">Instructor / Seller</MenuItem>
        </TextField>

        <TextField
          label="Enter Your Password"
          type="password"
          required
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />

        <TextField
          label="Enter Your Confirm Password"
          type="password"
          required
          onChange={(e) =>
            setUserData({ ...userData, confirmPassword: e.target.value })
          }
        />

        <Button variant="contained" onClick={handleSubmit}>
          Register
        </Button>

        <Typography>already have account?</Typography>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </Paper>
    </Container>
  );
}