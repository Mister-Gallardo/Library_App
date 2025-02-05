import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import ThemeToggleButton from "../../shared/ui/ThemeToggleButton";

const Layout: React.FC = () => (
  <Box
    sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <ThemeToggleButton />
    <Outlet />
  </Box>
);

export default Layout;
