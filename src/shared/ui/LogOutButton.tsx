import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogOutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLeave = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Button
      variant="outlined"
      sx={{ margin: "50px 0px 20px" }}
      onClick={handleLeave}
    >
      Выйти из аккаунта
    </Button>
  );
};

export default LogOutButton;
