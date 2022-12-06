import { Button } from "@mui/material";
import React from "react";

const ButtonGrey = (props) => {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        ...props.sx,
        backgroundColor: "#27272A",
        color: "#000",
      }}
    >
      {props.children}
    </Button>
  );
};

export default ButtonGrey;
