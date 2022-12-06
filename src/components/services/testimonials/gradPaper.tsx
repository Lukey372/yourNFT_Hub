import React from "react";
import { styled } from "@mui/system";
import { Paper } from "@mui/material";

const GradPaper = ({ children, ...rest }) => {
  return (
    <Paper {...rest}>
      <div className="gradient-div"></div>
      {children}
    </Paper>
  );
};

const StyledGradPaper = styled(GradPaper)(
  ({ theme }) => `
  background: transparent;
  position: relative;
  padding-top: 1px;
  border-radius: 60px;
  overflow: hidden;
  & .gradient-div {
    background: linear-gradient(180deg, #3f3f46 0%, #000000 100%);
    position: absolute;
    top: 0px;
    width: 100%;
    height: 270px;
    z-index: -1;
    
  }

  .dialog-box {
    // background: url(/images/serv_dialog.svg);
    background-size: contain;
    background-repeat: no-repeat;
    border: 2px solid #3F3F46;
    border-radius: 12px;
    margin-left: 8px;
  }

  .marquee {
    align-items: flex-start;
  }

 

  // custom styles for this page
   .MuiTooltip-popper {
    background-color: black;
  }
  & .MuiTypography-h3 {
      color: ${theme.palette.text.secondary};
      
  }
  & .ovScore {
    color: white;
  }
`
);
export default StyledGradPaper;
