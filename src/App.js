import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//import json from "./data.json";

import TreeView from "@mui/lab/TreeView";

import { useEffect, useRef, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CircularProgress, Typography } from "@mui/material";
import { CustomTreeItem } from "./Customes/CustomTreeItem";

import { DelDialog } from "./Dialogs/DelDialog";
import { AddDialog } from "./Dialogs/AddDialog";
import { EditDialog } from "./Dialogs/EditDialog";
import { CustomError } from "./Customes/CustomError";

import useAxios from "./Hooks/useAxios";

function App() {
  const axios = useAxios();

  // const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState(null);

  const focus = useRef(388);

  const handleFocus = (event, nodeId) => {
    setSelected(nodeId);
  };

  // const handleExpandClick = () => {
  //   setExpanded((oldExpanded) =>
  //     oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
  //   );
  // };

  // const handleSelect = (event, nodeId) => {
  //   setSelected(nodeId);
  // };

  // const handleToggle = (event, nodeIds) => {
  //   setExpanded('toggle',nodeIds);
  // };

  // error
  const [error, setError] = useState(false);

  // main data
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // dialog
  const [addOpen, setAddOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // delete click
  const del = (e, nodes) => {
    e.stopPropagation();
    // if has children
    if (nodes.children.length) {
      setError(true);
    } else {
      focus.current = nodes.id;
      setDelOpen(true);
    }
  };

  // edit click
  const edit = (e, nodes) => {
    e.stopPropagation();
    focus.current = nodes.id;
    setEditOpen(true);
  };

  // add click
  const add = (e, nodes) => {
    e.stopPropagation();
    focus.current = nodes.id;
    setAddOpen(true);
  };

  const renderTree = (nodes) => {
    return (
      <CustomTreeItem
        key={nodes.id}
        id={nodes.id}
        del={(e) => del(e, nodes)}
        edit={(e) => edit(e, nodes)}
        add={(e) => add(e, nodes)}
        nodeId={nodes.id.toString()}
        menu={selected == nodes.id}
        labelText={nodes.name}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node, nodes))
          : null}
      </CustomTreeItem>
    );
  };

  // get main data
  useEffect(() => {
    axios
      .get("api.user.tree.get", { params: { treeName: "Main" } })
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <div className="App">
      {/* <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? 'Open' : 'Close'}
      </Button> */}
      <Typography variant="h3" sx={{ p: 2 }}>
        Tree demo
      </Typography>
      <div className="tree">
        {data ? (
          <TreeView
            aria-label="file system navigator"
            defaultExpanded={[]}
            // expanded={expanded}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeFocus={handleFocus}
            //onNodeToggle={handleToggle}
          >
            {renderTree(data)}
          </TreeView>
        ) : (
          <CircularProgress />
        )}
      </div>
      <div className="copy">by Victor Steshyn</div>

      <CustomError setError={setError} error={error} />

      <AddDialog
        setOpen={setAddOpen}
        open={addOpen}
        focus={focus.current}
        refresh={setRefresh}
      />
      <EditDialog
        setOpen={setEditOpen}
        open={editOpen}
        focus={focus.current}
        refresh={setRefresh}
      />
      <DelDialog
        setOpen={setDelOpen}
        open={delOpen}
        focus={focus.current}
        refresh={setRefresh}
      />
    </div>
  );
}

export default App;
