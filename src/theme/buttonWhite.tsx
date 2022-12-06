import { Button } from "@mui/material";
import React from "react";

const ButtonWhite = React.forwardRef((props: any, ref) => {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        ...props.sx,
        backgroundColor: "white",
        color: "black",
        "&:hover": {
          backgroundColor: "#d3d3d3",
        },
      }}
    // ref={ref}
    >
      {props.children}
    </Button>
  );
});

export default ButtonWhite;
