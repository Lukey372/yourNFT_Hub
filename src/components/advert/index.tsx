import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Box,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import advertBackground from "public/images/megaphone-with-speech-banner.png";

import TwitterIcon from "@mui/icons-material/Twitter";

const Advert = () => {
  return (
    <StyledDiv sx={{ height: { xs: "30vh", md: "50vh" } }}>
      <Container maxWidth="lg">
        <Grid container px={2}>
          <Grid item md={6} xs={12}>
            <Typography variant="h3" gutterBottom color="primary">
              Advertise With Us
            </Typography>
            <Typography variant="body1" gutterBottom color="#71717A">
              Share your products and services on Your NFT Hub to reach the
              right NFT community audience.
            </Typography>
            <Box sx={{}}>
              {/* <TextField
                variant="outlined"
                placeholder="Email"
                size="small"
                sx={{ width: "60%" }}
              /> */}
              <Button
                variant="contained"
                disableElevation
                startIcon={<TwitterIcon />}
                href={process.env.NEXT_PUBLIC_SEND_DM}
                target="_blank"
              >
                Send DM
              </Button>
            </Box>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Container>
    </StyledDiv>
  );
};

export default Advert;

const StyledDiv = styled("div")`
  // background: rgb(255, 255, 255);
  background: 
  // linear-gradient(
  //     180deg,
  //     rgba(255, 255, 255, 0) 18%,
  //     rgba(0, 0, 0, 0.6) 54%,
  //     rgba(63, 63, 70, 0) 81%
  //   ),
    url(${advertBackground.src}) bottom;

  background-size: cover;

  height: 45vh;
  & .MuiContainer-root {
    padding: 8% 0;
  }
  & .MuiOutlinedInput-input {
    background: #f4f4f5;
    border-radius: 4px;
    color: black;
  }
  & .MuiButton-contained {
    border: 1px white solid;
    margin-left: 1%;
    background-color: #1da1f2;
  }
`;
