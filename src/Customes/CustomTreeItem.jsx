// import PropTypes from 'prop-types';

import { Box, IconButton } from "@mui/material";

import TreeItem from "@mui/lab/TreeItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const itemStyle = {
  display: "flex",
  alignItems: "center",
  gridGap: 5,
  height: 36,
};

const CustomTreeItem = (props) => {
  const { id, del, edit, menu, add, labelText, children, ...other } = props;

  return (
    <TreeItem
      label={
        <Box sx={itemStyle}>
          <div>{labelText}</div>
          {menu ? (
            // I saw root id change sometime
            id === 388 ? (
              <div>
                <IconButton
                  aria-label="add"
                  color="primary"
                  onClick={e => add(e)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>
            ) : (
              <div>
                <IconButton
                  aria-label="add"
                  color="primary"
                  onClick={e => add(e)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={e => edit(e)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="default"
                  onClick={e => del(e)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            )
          ) : (
            ""
          )}
        </Box>
      }
      {...other}
    >
      {children}
    </TreeItem>
  );
};

// CustomTreeItem.propTypes = {
//     nodeId: PropTypes.string.isRequired,
//     labelText: PropTypes.string.isRequired
// };

export { CustomTreeItem };
