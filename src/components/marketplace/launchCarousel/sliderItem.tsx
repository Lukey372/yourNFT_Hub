import React, { Fragment } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import ButtonWhite from "src/theme/buttonWhite";

const SliderItem = () => {
  return (
    <Fragment>
      <Card
        sx={{
          background: `url(${'/images/marketplace/launch.png'})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Box>
          <CardContent sx={{ height: "100%" }}>
            <Container maxWidth="lg">
              <Grid
                container
                spacing={5}
                direction="row"
                alignItems="center"
                sx={{
                  height: {
                    xl: "60vh",
                    lg: "70vh",
                    md: "60vh",
                    sm: "35vh",
                    xs: "25vh",
                  },
                }}
              >
                <Grid item md={6}>
                  <Typography variant="h3">
                    Your NFT Hub <br></br>Launchpad
                  </Typography>
                  {/* <ButtonWhite
                    sx={{
                      px: 4,
                      py: 2,
                      borderRadius: '4px',
                      mt: 4
                    }}
                  >
                    <Typography variant={`body1`} sx={{ fontWeight: 500 }} component="div">
                      Appply Now
                    </Typography>
                  </ButtonWhite> */}
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: '16px 32px',
                      borderRadius: '4px'
                    }}
                    className="mt-32"
                  >
                    <Typography variant={`body1`} sx={{ fontWeight: 500 }} component="div">
                      Appply Now
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </CardContent>
        </Box>
      </Card>
    </Fragment >
  );
};

export default SliderItem;
