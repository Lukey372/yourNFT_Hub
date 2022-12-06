import * as React from "react";
import { styled } from "@mui/system";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  background: transparent;
  .MuiSvgIcon-root {
    color: #3b82f6;
    font-size: 2rem;
  }
  .MuiCardHeader-root {
    padding-bottom: 0;
  }
`;
