import { Paper } from "@mui/material";
import { styled } from "@mui/system";

export const StyledPaper = styled(Paper)`
  & .MuiSvgIcon-root {
    color: white;
    font-size: 2.5rem;
  }

  &&.swiper + .MuiStack {
    flex-direction: row;
    justify-content: center;
  }
`;
