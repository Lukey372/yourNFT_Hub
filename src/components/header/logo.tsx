import React from "react";
import { Grid, Link as Linkm, Typography } from "@mui/material";
import LogoIcon from "src/theme/logo";
import Link from "next/link";

const Logo = React.forwardRef(({ href, sx }, ref) => {
  return (
    <>
      <Link href="/">
        <Grid
          container
          maxWidth="20%"
          alignItems="center"
          sx={{
            ...sx,
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Grid item xs={4}>
            <a href={href} ref={ref}>
              <LogoIcon sx={{ fontSize: "3.8rem !important" }} />
            </a>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
              color="text.primary"
            >
              Your
            </Typography>

            <Typography
              variant="h5"
              component="div"
              sx={{
                display: { xs: "none", md: "flex" },
                fontSize: { sm: "1.87rem" },
              }}
            >
              NFT Hub
            </Typography>
          </Grid>
        </Grid>
      </Link>
    </>
  );
});

export default Logo;
