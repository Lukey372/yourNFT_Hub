import { Button } from "@mui/material";
import React from "react";

const ButtonTransparent = (props) => {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        ...props.sx,
        backgroundColor: "transparent",
        color: "text.primary",
      }}
    >
      {props.children}
    </Button>
  );
};

export default ButtonTransparent;
