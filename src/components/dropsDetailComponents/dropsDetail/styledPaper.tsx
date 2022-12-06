import { styled } from "@mui/system";

export const StyledPaper = styled("div")(
  ({ theme }) => `
  .MuiButton-contained {
    background: ${theme.palette.secondary.main};
    color: ${theme.palette.text.secondary};
    margin: 0 5px;
  }

  & > .MuiGrid-container {
    position: relative;
    top: -60px;
  }
  .MuiAvatar-circular {
    box-shadow: 0px 0px 64px -30px #ffffff;
  }
  .MuiGrid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .MuiSvgIcon-root {
      margin: auto;
      color: grey;
    }
  }
  & .icon-box .MuiIconButton-root {
    color: white;
    border: solid;
    border-width: .5px 1px;
    border-bottom: 0;
    border-radius: 0;
    padding: 10px;
    transition: all .3s ease;
    &:hover {
      color: #71717A;
    }
    &:first-child {
      border-radius: 4px;
    }
    &:last-child {
      border-bottom: 1px solid;
      border-radius: 4px;
    }

    ${theme.breakpoints.down("md")} {
      border-bottom: 1px solid;
    }
  }
  & .icon-box .MuiSvgIcon-root {
    color: inherit;
  }
`
);
