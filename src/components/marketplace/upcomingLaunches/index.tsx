import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { url } from "inspector";

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Stack
} from "@mui/material";

import ListItem from "./listItem";

// taken from latest news

const UpcomingLaunches = (props: any) => {
  const dispatch = useDispatch();
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
          background: theme => `${theme.palette.background.default}`,
        }}
      >
        <Container maxWidth="lg" sx={{ zIndex: 1 }}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                mb: 8
              }}
            >
              Upcoming Launches
            </Typography>

            <Grid
              container
              direction="row"
              alignItems="flex-start"
              spacing={3}
              sx={{
                pb: 12
              }}
            >
              {data?.map((item: any, index: number) => {
                return (
                  <Grid item lg={4} xs={6} sx={{ mb: 6 }} key={index}>
                    <ListItem
                      image={item.baseImage}
                      date={item.launchDate}
                      title={item.name}
                      symbol={item.symbol}
                    />
                  </Grid>
                );
              })}
            </Grid>

            {!data?.length && (
              <Typography
                variant="h5"
                textAlign="center"
                component="p"
                sx={{
                  pb: 3,
                }}
              >
                No Launches ...
              </Typography>
            )}
          </Stack>
        </Container>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "270px",
            background: "linear-gradient(180deg, #000 0%, #3F3F46 100%)",
          }}>

        </Box>
      </Paper>
    </Fragment>
  );
};

export default UpcomingLaunches;
