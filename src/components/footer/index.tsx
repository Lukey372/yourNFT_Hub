import { Container, Grid, Link, Typography } from "@mui/material";
import React from "react";
import Logo from "src/theme/logo";

const Footer = () => {
  const company = [
    // { title: "About Us", link: "#" },
    { title: "Privacy Policy", link: "/privacy" },
    // { title: "How To guide", link: "#" },
    { title: "Terms of service", link: "/terms" },
  ];
  const commuinty = [
    { title: "Twitter", link: "https://twitter.com/YourNFTHub" },
    { title: "Discord", link: "https://discord.gg/e9VDZyXmtH" },
    { title: "FAQs", link: "#" },
  ];
  return (
    <>
      <Container maxWidth="lg">
        <Grid container height="inherit" sx={{ minHeight: "150px" }}>
          <Grid item md={3} xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <Logo sx={{ fontSize: "3.8rem" }} />
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  Your
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontSize: "1.2rem",
                  }}
                >
                  NFT Hub
                </Typography>
              </Grid>
            </Grid>
            <Typography
              variant="h5"
              component="div"
              sx={{
                mr: 2,
                mt: 2,
              }}
            >
              Your One Stop For Everything NFT Related.
            </Typography>
          </Grid>
          <Grid item md={3}></Grid>
          <Grid item md={3} xs={6}>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={
                {
                  //   fontSize: "1rem",
                }
              }
              gutterBottom
            >
              Company
            </Typography>
            {company.map((item, index) => (
              <Link
                href={item.link}
                underline="none"
                color="inherit"
                sx={{
                  display: "block",
                  typography: "h6",
                  fontFamily: "DM Sans",
                }}
                key={item.title}
              >
                {item.title}
              </Link>
            ))}
          </Grid>
          <Grid item md={3} xs={6}>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={
                {
                  //   fontSize: "1rem",
                }
              }
              gutterBottom
            >
              Community
            </Typography>
            {commuinty.map((item) => (
              <Link
                href={item.link}
                underline="none"
                color="inherit"
                sx={{
                  display: "block",
                  typography: "h6",
                  fontFamily: "DM Sans",
                }}
                key={item.title}
                target="_blank"
              >
                {item.title}
              </Link>
            ))}
          </Grid>
        </Grid>
        <Typography
          variant="body1"
          color={"text.secondary"}
          component="p"
          sx={{
            my: 2,
            // fontSize: "1rem",
          }}
        >
          Copyright &copy; 2022 Your NFT Hub. All Rights Reserved.
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
