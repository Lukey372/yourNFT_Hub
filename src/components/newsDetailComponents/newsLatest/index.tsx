import React, { Fragment } from "react";
import SliderItem from "./sliderItem";
import Carousel from "react-material-ui-carousel";
import {
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  Box,
  Stack,
} from "@mui/material";
import ButtonWhite from "src/theme/buttonWhite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { url } from "inspector";
import LatestItem from "./latestItem";

import { useDispatch, useSelector } from "react-redux";
import { newsListSelector } from "src/common/selectors";
import ButtonTransparent from "src/theme/buttonTransparent";
import StyledGradPaper from "./gradPaper";
import { fetchNewsStart } from "src/common/slices/news.slice";

const NewsLatest = ({ asSidebar }: { asSidebar: boolean | undefined }) => {
  const dispatch = useDispatch();
  const newsList = useSelector(newsListSelector);

  const latestNewsList =
    newsList?.rows?.filter?.((news) => news.is_latest === 1) || [];

  React.useEffect(() => {
    if (latestNewsList.length < 1) dispatch(fetchNewsStart({ page_num: 1 }));
  }, []);

  const sideBar = (
    <Paper
      sx={{
        overflow: "hidden",
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {latestNewsList.map((news, index) => {
        if (index < 4) return <LatestItem key={index} news={news} />;
      })}
    </Paper>
  );

  if (asSidebar == true) return sideBar;
  else
    return (
      <Fragment>
        <StyledGradPaper
          sx={{
            borderRadius: 5,
            mt: 5,
            pt: 3,
            display: "flex",
            flexDirection: "column",
            "& img": { borderRadius: "8px" },
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h5"
              align="left"
              component="div"
              sx={{ my: 1 }}
            >
              The Latest
            </Typography>
            {!latestNewsList.length && (
              <Typography
                variant="h6"
                textAlign="center"
                component="div"
                sx={{
                  my: 3,
                }}
              >
                No News Found...
              </Typography>
            )}
            {sideBar}
          </Container>
        </StyledGradPaper>
      </Fragment>
    );
};

export default NewsLatest;

/// Old code use for refrence only
//
//
//
<Paper
  sx={{
    borderRadius: 10,
    mt: 5,
    pt: 5,
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(180deg, #3F3F46 0%, #000000 25%)",
    // "& img": { borderRadius: "20px" },
  }}
>
  <Container maxWidth="lg">
    <Typography variant="h3" textAlign="center" component="div" sx={{ my: 7 }}>
      The Latest
    </Typography>
    <Grid container spacing={3} sx={{ minHeight: "500px" }}>
      <Grid item md={6} xs={12}>
        <Paper
          sx={{
            backgroundImage: `url(https://picsum.photos/600/600)`,

            borderRadius: "20px",
            height: "100%",
          }}
        >
          <div
            style={{
              height: "inherit",
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 79.59%)",
            }}
          >
            <Stack
              sx={{
                p: 5,
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                height: "inherit",
              }}
            >
              <Typography variant="h4">{/* {headNews?.title} */}</Typography>
              {/* <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        NFTs are much easier to understand than most people
                        think. This guide aims to demystify NFTs and give you a
                        basic understanding of what they are, what they do, and
                        most importantly, why they matter.
                      </Typography> */}
              <ButtonTransparent
                sx={{
                  textTransform: "capitalize",
                  mt: 1.5,
                  fontSize: "1rem",
                  px: 4,
                  py: 2,
                  border: "1px solid white",
                }}
              >
                read more
                <ArrowForwardIcon sx={{ ml: 0.5, fontSize: "1.1rem" }} />
              </ButtonTransparent>
            </Stack>
          </div>
        </Paper>
      </Grid>
      <Grid item md={6} xs={12}>
        {/* {sideBar} */}
      </Grid>
    </Grid>
  </Container>
</Paper>;
