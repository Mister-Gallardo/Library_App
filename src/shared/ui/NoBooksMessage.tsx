import { Typography } from "@mui/material";
import React from "react";

const NoBooksMessage: React.FC = () => (
  <Typography variant="h5" sx={{ margin: 10, textAlign: 'center' }}>
    Список книг пуст
  </Typography>
);

export default NoBooksMessage;