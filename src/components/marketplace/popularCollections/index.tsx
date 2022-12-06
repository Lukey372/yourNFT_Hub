import React, { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import Link from 'next/link';

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import ListItem from "./listItem";
import ButtonWhite from "src/theme/buttonWhite";

const PopularCollections = (props) => {
  const { data } = props;

  return (
    <Fragment>
      <Paper
        sx={{
          position: 'relative',
          borderRadius: 10,
          mt: 5,
          pt: 5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg" sx={{ zIndex: 1 }}>
          <Box
            display={`flex`}
            alignItems={`center`}
            justifyContent={`center`}
            sx={{ my: 7 }}
          >
            <Typography
              variant="h3"
              textAlign="center"
              component="div"
            >
              Popular Collections
            </Typography>
          </Box>


          <Grid
            container
            direction="row"
            alignItems="stretch"
            spacing={2}
          >
            {data?.map((item: any, index: number) => {
              return (
                <Grid item md={3} sm={4} xs={6} key={index}>
                  <ListItem
                    image={item.baseImage}
                    descript={item.description}
                    title={item.name}
                    symbol={item.symbol}
                  />
                </Grid>
              );
            })}
          </Grid>

          <Grid
            container
            direction={`row`}
            alignItems={`center`}
            justifyContent={`center`}
            sx={{ mt: 4 }}
          >
            <Grid item xs={12} sx={{ textAlign: `center` }}>
              <ButtonWhite
                sx={{
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  px: { md: 4, sm: 3 },
                  py: 2,
                }}
                onClick={async () => {

                }}
              >
                <Link href={`/marketplace/all`} as={`/marketplace/all`} passHref>
                  Explorer
                </Link>
              </ButtonWhite>
            </Grid>
          </Grid>

          {!data || data?.length < 1 && (
            <Typography
              variant="h5"
              textAlign="center"
              component="p"
              sx={{
                my: 7,
              }}
            >
              No Collections ...
            </Typography>

          )}
        </Container>
      </Paper>
    </Fragment>
  );
};

export default PopularCollections;
