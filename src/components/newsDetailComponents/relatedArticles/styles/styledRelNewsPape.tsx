import * as React from "react";
import { styled } from "@mui/system";
import { Paper } from "@mui/material";
import ButtonWhite from "src/theme/buttonWhite";

export const StyledPaper = styled(Paper)`
  & .MuiButton-root {
    margin-top: 50px;
    text-transform: capitalize;
  }
`;
