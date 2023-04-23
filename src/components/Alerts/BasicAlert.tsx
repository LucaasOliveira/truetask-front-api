import { AlertColor, Snackbar, Stack } from "@mui/material";

import React from "react";
import { AlertElement } from "./AlertElement";

interface BasicAlertProps {
  message: string;
  openAlert: boolean;
  setOpenAlert: (isOpen: boolean) => void;
  alertColor: AlertColor | undefined;
}

const BasicAlert: React.FC<BasicAlertProps> = ({
  message,
  openAlert,
  setOpenAlert,
  alertColor
}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <AlertElement
          onClose={handleClose}
          severity={alertColor}
          sx={{ width: "100%" }}
        >
          {message}
        </AlertElement>
      </Snackbar>
    </Stack>
  );
};

export default BasicAlert;
