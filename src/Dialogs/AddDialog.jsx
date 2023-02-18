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

const AddDialog = (props) => {

  const { open, setOpen, focus, refresh} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");

  const axios = useAxios();

  const handleClose = () => {
    setOpen(false);
  };

  const handleReq = () => {

    const makeReq = () => {
      const req={
        treeName: 'Main',
        parentNodeId: focus,
        nodeName: name
      }

      axios.get('api.user.tree.node.create',{params:req})
      .then(() => {
        setIsLoading(false);
        setOpen(false);
        // refresh data as an example
        refresh(prevState => !prevState);
      })
      .catch(err=>console.log(err));
    }

    if(name.length){
      setIsLoading(true);
      makeReq()
    }else{
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
      <DialogTitle id="alert-dialog-title">Add new node</DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="New tree item name"
            variant="outlined"
            error={error}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setError(false)}
            autoFocus
          />
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, pr: 3 }}>
        <Button onClick={handleClose} variant={"outlined"}>
          Cancel
        </Button>
        <Button onClick={handleReq} variant={"contained"} disableElevation>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export { AddDialog };
