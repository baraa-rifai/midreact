import {
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    login(userData.email, userData.password);
  };

  return (
    <Container sx={{ my: "auto" }}>
      <Paper
        elevation={4}
        sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography variant="h3">Welcome Back!</Typography>
        <Divider>complete your journey</Divider>

        <TextField
          label="Enter Your Email"
          type="email"
          onChange={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
        />

        <TextField
          label="Enter Your Password"
          type="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />

        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>

        <Typography>don't have account?</Typography>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </Paper>
    </Container>
  );
}
