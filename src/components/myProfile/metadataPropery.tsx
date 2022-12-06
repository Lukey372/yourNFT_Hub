import { Button } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: "12px 24px",
  textAlign: 'left',
  color: theme.palette.text.secondary,
  backgroundColor: "#18181B",
  width: "160px",
}));

const metadataPropery = ({ propName, propValue, propPec }) => {
  return (
    <Item>
      <Typography style={{ fontSize: "15px" }} sx={{ color: "#71717A" }}>{propName}</Typography>
      <Typography style={{ fontSize: "15px" }} sx={{ color: "#fff" }}>{propValue}</Typography>
      <Typography style={{ fontSize: "15px" }} sx={{ color: "#A1A1AA" }}>{propPec}%</Typography>
    </Item>
  );
};

export default metadataPropery;
