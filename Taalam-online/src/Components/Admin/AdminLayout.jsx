import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar open={open} toggleSidebar={toggleSidebar} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, transition: "margin 0.3s ease" }}>
        <Outlet />
      </Box>
    </Box>
  );
}