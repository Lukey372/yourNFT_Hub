import React, { Fragment, useEffect } from "react";
import SliderItem from "./guideItem";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Box, Stack, Container, Grid } from "@mui/material";
import GuideItem from "./guideItem";
import { fetchGuidesStart } from "src/common/slices/guides.slice";
import { useDispatch, useSelector } from "react-redux";
import { guidesListSelector } from "src/common/selectors";
import Link from "next/link";

const GuidesnLists = () => {
  const dispatch = useDispatch();
  const guideListSelector = useSelector(guidesListSelector);
  const newslist = false
    ? guideListSelector.rows
    : [
      {
        image: "https://picsum.photos/1200/300",
        title: "The 10 Biggest NFT Sales of 2021",
        date: "07-01-2022",
      },
      {
        image: "https://picsum.photos/1200/300",
        title: "The 10 Biggest NFT Sales of 2021",
        date: "05-01-2022",
      },
      {
        image: "https://picsum.photos/1200/300",
        title: "The 10 Biggest NFT Sales of 2021",
        date: "07-01-2022",
      },
      // {
      //   image: "https://picsum.photos/1200/300",
      //   title: "The 10 Biggest NFT Sales of 2021",
      //   date: "08-01-2022",
      // },
    ];

  useEffect(() => {
    dispatch(fetchGuidesStart());
  }, []);
  return (
    <Fragment>
      <Paper sx={{ alignItems: "center", mt: 5, bgcolor: "black" }}>
        <Container maxWidth="lg">
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h3" textAlign="center">
              Guides & Lists
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
            >
              {newslist?.map((item, index) => {
                if (index > 2) return;
                return (
                  <Grid item md={4} key={item.id}>
                    <GuideItem
                      image={item.image}
                      date={item.created_at}
                      title={item.title}
                      id={item.id}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Container>
      </Paper>
    </Fragment>
  );
};

export default GuidesnLists;
