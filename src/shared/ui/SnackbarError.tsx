import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackbarError: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => (
  <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity='error'
      variant="filled"
      sx={{ width: "100%" }}
    >
      Произошла ошибка. Попробуйте снова!
    </Alert>
  </Snackbar>
);

export default SnackbarError;
