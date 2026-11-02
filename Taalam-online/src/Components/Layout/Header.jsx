import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          Taalam-online
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button color="inherit" onClick={() => navigate("/home")}>
            Home
          </Button>

          {currentUser ? (
            <>
              {currentUser.role === "student" && (
                <>
                  <Button color="inherit" onClick={() => navigate("/my-courses")}>
                    My Courses
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/student-messages")}>
                    Messages
                  </Button>
                </>
              )}

              {currentUser.role === "admin" && (
                <Button color="inherit" onClick={() => navigate("/admin/dashboard")}>
                  Admin Panel
                </Button>
              )}

              {currentUser.role === "instructor" && (
                <Button color="inherit" onClick={() => navigate("/instructor/dashboard")}>
                  Instructor Panel
                </Button>
              )}

              <Button color="error" variant="contained" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="secondary" variant="contained" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}