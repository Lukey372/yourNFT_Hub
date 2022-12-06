import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  Grid
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

import { Swiper, SwiperSlide } from "swiper/react";
//Custom swiper modules
import SwiperCore, { Navigation, Autoplay } from "swiper";
SwiperCore.use([Navigation, Autoplay]);
// Import Swiper styles
import "swiper/css";

import { MARKETPLACES_API } from "src/common/config";
import commonService from "src/common/services/common.service";

import SliderItem from "./sliderItem";
import { StyledPaper } from "./styled/styledPaper";
import ButtonWhite from "src/theme/buttonWhite";

const NewsCorousel = () => {

  const breakpoints = {
    "600": {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    "768": {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    "900": {
      slidesPerView: 3,
      spaceBetween: 28,
    },
    "1200": {
      slidesPerView: 4,
      spaceBetween: 32,
    },
    "1536": {
      slidesPerView: 5,
      spaceBetween: 36,
    },
  };
  const navigationCustom = {
    nextEl: ".swiper-next-button",
    prevEl: ".swiper-prev-button",
  };

  const [news, setNews] = useState<any | any[]>([]);

  useEffect(() => {
    (async () => {
      const result = await commonService({
        method: "get",
        route: `${MARKETPLACES_API.NEW_COLLECTIONS}`,
      });
      setNews(result);
    })()
  }, []);



  return (
    <Fragment>
      <StyledPaper sx={{ alignItems: "center", mt: 4, bgcolor: "black" }}>
        <Box sx={{ justifyContent: "center" }}>
          <Box
            display={`flex`}
            alignContent={`center`}
            alignItems={`center`}
            justifyContent={`center`}
            sx={{
              mb: 8
            }}
          >
            <Typography variant="h3" textAlign="center">
              New Collections
            </Typography>
          </Box>


          <Swiper
            onSlideChange={() => { }}
            onSwiper={(swiper) => { }}
            centeredSlides={false}
            navigation={navigationCustom}
            autoplay={false}
            breakpoints={breakpoints}
            loop={false}
          >
            {news?.map((news: any, index: number) => (
              <SwiperSlide key={index}>
                <SliderItem
                  image={news.baseImage}
                  date={news.launchDate}
                  title={news.name}
                  symbol={news.symbol}
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
    </Fragment >
  );
};

export default NewsCorousel;
