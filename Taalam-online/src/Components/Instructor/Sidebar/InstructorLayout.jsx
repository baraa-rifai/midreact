import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";

export default function InstructorLayout() {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <InstructorSidebar open={open} toggleSidebar={toggleSidebar} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, transition: "margin 0.3s ease" }}>
        <Outlet />
      </Box>
    </Box>
  );
}