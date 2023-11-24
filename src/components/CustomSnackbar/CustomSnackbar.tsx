import { FC } from "react";
import { createPortal } from "react-dom";
import { Snackbar, Alert, SnackbarProps } from "@mui/material";

interface SnackbarPortalProps extends SnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

const CustomSnackbar: FC<SnackbarPortalProps> = ({
  open,
  message,
  severity,
  ...rest
}) => {
  return createPortal(
    <Snackbar open={open} autoHideDuration={6000} {...rest}>
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>,
    document.body
  );
};

export default CustomSnackbar;
