import { Card } from "@mui/material";
import { styled } from "@mui/system";

export const StyledCard = styled('div')`
  background-color: black;
  border: 5px solid white;
  border-radius: 12px;

  & .MuiTypography-root {
    text-align: left;
    text-overflow: ellipsis
    overflow: hidden;
    text-transform: capitalize;
  }
  & .MuiCardContent-root {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
