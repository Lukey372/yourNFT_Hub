import React from "react";
import { Table } from "@mui/material";
import { styled } from "@mui/system";

const StyleTable = styled(Table)`
  & .MuiTableRow-root {
    border-bottom: "solid 1px #5c5c5c";
    border: 2px solid #27272a;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0px 0px 64px -30px #ffffff;
    }
  }

  .MuiTableCell-root {
    border-top: 2px solid #27272a;
    border-bottom: 2px solid #27272a;
    
  }

  .MuiTableCell-head {
    border: 0;
  }
  .trstart {
    border-left: 2px solid #27272a;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .trend {
    border-right: 2px solid #27272a;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  border-collapse: separate;
  border-spacing: 0 1em;
`;

export default StyleTable;
