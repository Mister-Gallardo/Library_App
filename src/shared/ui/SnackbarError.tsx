import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackbarError: React.FC<{ open: boolean; message: string; handleClose: () => void }> = ({
  open,
  message,
  handleClose,
}) => (
  <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity='error'
      variant="filled"
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarError;
