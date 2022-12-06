import React from "react";
import { Tabs } from "@mui/material";
import { styled } from "@mui/system";

const StyledTabs = styled(Tabs)({
  ".MuiTabs-flexContainer": {
    borderBottom: "solid 1px #5c5c5c",
  },

  ".MuiTab-root": {
    fontSize: "1.2rem",
    textTransform: "capitalize",
  },
  ".MuiTabs-indicator": {
    backgroundColor: "grey",
  },
});

export default StyledTabs;
