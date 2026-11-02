import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box, Divider, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import MailIcon from "@mui/icons-material/Mail";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CampaignIcon from "@mui/icons-material/Campaign";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";

const drawerWidth = 240;
const collapsedWidth = 65;

export default function InstructorSidebar({ open, toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/instructor/dashboard" },
    { text: "Manage Courses", icon: <BookIcon />, path: "/instructor/manage-courses" },
    { text: "Manage Students", icon: <SchoolIcon />, path: "/instructor/manage-students" },
    { text: "Ratings & Reviews", icon: <StarIcon />, path: "/instructor/ratings" },
    { text: "Announcements", icon: <CampaignIcon />, path: "/instructor/dashboard#announcements" },
    { text: "Messages", icon: <MailIcon />, path: "/instructor/messages" },
    { text: "Admin Messages", icon: <AdminPanelSettingsIcon />, path: "/instructor/admin-messages" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justify: "space-between",
        },
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: open ? "space-between" : "center", p: 2 }}>
          {open && (
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Instructor Panel
            </Typography>
          )}
          <IconButton onClick={toggleSidebar}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={logout}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                color: "error.main",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "error.main",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}