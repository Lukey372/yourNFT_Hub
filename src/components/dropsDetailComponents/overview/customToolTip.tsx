import { grey } from "@mui/material/colors/";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

const CustomToolTip = ({ children, title }) => {
  return (
    <>
      <Tooltip
        title={title}
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: grey[800],
              maxWidth: "200px",
              p: 2,
            },
          },
          arrow: {
            sx: {
              color: grey[800],
            },
          },
        }}
        placement="right"
        arrow
      >
        {children}
      </Tooltip>
    </>
  );
};

export default CustomToolTip;
