import { styled } from "@mui/system";

export const StyledPaper = styled("div")(
  ({ theme }) => `
  .MuiButton-contained {
    // background: ${theme.palette.primary.main};
    color: ${theme.palette.text.secondary};
    margin: 0 5px;
  }

  .MuiButton-text {
      color: ${theme.palette.text.secondary};
      font-size: 1.25rem;
      &:hover {
          color: ${theme.palette.text.primary};
      }
  }

  .MuiCard-root {
      background-color: ${theme.palette.primary.main};
      border-radius: 20px;
      border: 2px solid #71717A;
  }

  
`
);
