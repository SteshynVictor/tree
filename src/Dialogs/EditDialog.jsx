import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import useAxios from "../Hooks/useAxios";
import { useState } from "react";

const EditDialog = (props) => {

  const { open, setOpen, focus, refresh } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const axios = useAxios();

  const handleClose = () => {
    setOpen(false);
  };

  const handleReq = () => {
    const makeReq = () => {
      const req = {
        treeName: "Main",
        nodeId: focus,
        newNodeName: name,
      };

      axios
        .get("api.user.tree.node.rename", { params: req })
        .then(() => {
          setIsLoading(false);
          setOpen(false);
          // refresh data as an example
          refresh(prevState => !prevState);
        })
        .catch((err) => console.log(err));
    };

    if (name.length) {
      setIsLoading(true);
      makeReq();
    } else {
      setError(true);
    }
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
      <DialogTitle id="alert-dialog-title">Rename node</DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <TextField
            value={name}
            fullWidth={true}
            id="outlined-basic"
            label="New node name"
            variant="outlined"
            required={true}
            autoFocus={true}
            error={error}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setError(false)}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, pr: 3 }}>
        <Button onClick={handleClose} variant={"outlined"}>
          Cancel
        </Button>
        <Button onClick={handleReq} variant={"contained"} disableElevation>
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export { EditDialog };
