import React, { Fragment } from "react";
import SliderItem from "./sliderItem";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import {
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { fetchNewsStart } from "src/common/slices/news.slice";
import { useSelector, useDispatch } from "react-redux";
import { newsListSelector } from "src/common/selectors";

//Custom swiper modules
import SwiperCore, { Navigation, Autoplay } from "swiper";
SwiperCore.use([Navigation, Autoplay]);

//Icons for swiper
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { StyledPaper } from "./styled/styledPaper";

const NewsCorousel = () => {
  const dispatch = useDispatch();
  const newsList = useSelector(newsListSelector)?.rows;
  const recentNewsList = newsList?.rows;
  const newslistold = [
    {
      image: "https://picsum.photos/1200/300",
      title: "title1",
      date: "07-01-2022",
    },
    {
      image: "https://picsum.photos/1200/300",
      title: "title2",
      date: "05-01-2022",
    },
    {
      image: "https://picsum.photos/1200/300",
      title: "title3",
      date: "07-01-2022",
    },
    {
      image: "https://picsum.photos/1200/300",
      title: "title4",
      date: "08-01-2022",
    },
  ];

  const breakpoints = {
    "600": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "768": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "900": {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    "1200": {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    "1536": {
      slidesPerView: 5,
      spaceBetween: 25,
    },
  };

  const navigationCustom = {
    nextEl: ".swiper-next-button",
    prevEl: ".swiper-prev-button",
  };

  const autoplayCustom = {
    delay: 1500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  React.useEffect(() => {
    dispatch(fetchNewsStart());
  }, []);
  return (
    <Fragment>
      <StyledPaper sx={{ alignItems: "center", mt: 5, bgcolor: "black" }}>
        <Box sx={{ justifyContent: "center" }}>
          <Typography variant="h3" textAlign="center" gutterBottom>
            News
          </Typography>

          <Swiper
            onSlideChange={() => { }}
            onSwiper={(swiper) => { }}
            centeredSlides
            navigation={navigationCustom}
            autoplay={autoplayCustom}
            breakpoints={breakpoints}
            loop={true}
          >
            {newsList?.map?.((news, index) => (
              <SwiperSlide key={news.id}>
                <SliderItem
                  image={news.image}
                  date={news.created_at}
                  title={news.title}
                  id={news.id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Stack direction="row" justifyContent="center" spacing={1} mt={1.5}>
            <IconButton aria-label="news next" className="swiper-prev-button">
              <ArrowCircleLeftOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label="news previous"
              className="swiper-next-button"
            >
              <ArrowCircleRightOutlinedIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
          </Stack>
        </Box>
      </StyledPaper>
    </Fragment>
  );
};

export default NewsCorousel;
