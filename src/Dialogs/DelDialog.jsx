import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

import useAxios from "../Hooks/useAxios";
import { useState } from "react";

const DelDialog = (props) => {

  const { open, setOpen, focus, refresh } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const axios = useAxios();

  const handleReq = () => {
    setIsLoading(true);

    const req = {
      treeName: "Main",
      nodeId: focus,
    };

    axios
      .get("api.user.tree.node.delete", { params: req })
      .then(() => {
        setIsLoading(false);
        setOpen(false);
        // refresh data as an example
        refresh(prevState => !prevState);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DialogContentText id="alert-dialog-description">
            Do you want delete this node?
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, pr: 3 }}>
        <Button onClick={handleClose} variant={"outlined"}>
          Cancel
        </Button>
        <Button
          onClick={handleReq}
          variant={"contained"}
          disableElevation
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export { DelDialog };
