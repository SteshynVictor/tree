import { Alert, Snackbar } from "@mui/material";

const CustomError = (props) => {
  const { error, setError } = props;

  // snack
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  return (
    <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        Can't delete! You have to delete all children nodes first
      </Alert>
    </Snackbar>
  );
};

export { CustomError };
