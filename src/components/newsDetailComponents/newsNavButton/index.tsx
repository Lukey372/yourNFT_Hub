import { Button, Card, Paper, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

const NewsNavButton = ({ title, body, sx, href, ...rest }) => {
  return (
    <Link href={href}>
      <Button
        variant="contained"
        sx={{
          ...sx,
          justifyContent: "flex-start",
          flexDirection: "column",
          textTransform: "capitalize",
          boxShadow: "0px 0px 64px -30px #fff",
          p: 2.5,
          borderRadius: 3,
          transition: "ease all 0.7s",
          " :disabled": {
            ".MuiTypography-h6": {
              color: "grey.700",
            },
          },
        }}
        {...rest}
      >
        <Typography variant="h4" component="div" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" fontSize="1.1rem" my={2}>
          {body}
        </Typography>
      </Button>
    </Link>
  );
};

export default NewsNavButton;
