import React, { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";

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

import { rgbDataURL } from "src/common/utils/rgbDataUrl";
import { serverUrl } from "src/common/config";

const SliderItem = (props: any) => {
  const { image, name, description, url, title } = props;
  return (
    <Fragment>
      <Card
        sx={{
          position: 'relative'
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundImage: `url(${serverUrl}${image})`,
            backgroundSize: "cover",
            backgroundPosition: `center`,
            backgroundRepeat: "no-repeat",
            boxSizing: 'border-box',
            boxShadow: 'inset 0 -128px 196px 0 #000000'
          }}
        >
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
                    lg: "60vh",
                    md: "60vh",
                    sm: "60vh",
                    xs: "60vh",
                  },
                }}
              >
                <Grid item md={6}>
                  <Typography variant="h3">
                    {title}
                  </Typography>
                  <Typography variant="body1" mt={4} fontSize={"1.2rem"}>
                    {description}
                  </Typography>
                  <Link href={`${url}`}>
                    <a target="_blank">
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
                        {name}
                      </Button>
                    </a>
                  </Link>

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
