import { Card } from "@mui/material";
import { styled } from "@mui/system";

export const StyledCard = styled(Card)`
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
    height: 110px;
    text-overflow: ellipsis;
    overflow: hidden;
    
  }
`;
