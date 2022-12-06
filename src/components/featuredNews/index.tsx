import React, { Fragment } from "react";
import SliderItem from "./sliderItem";
import Carousel from "react-material-ui-carousel";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ButtonWhite from "src/theme/buttonWhite";
import { useSelector } from "react-redux";
import { featuredNewsSelector } from "src/common/selectors";
import LinkNext from "next/link";

import { handleImageError } from "src/common/utils/handleImageError";
import news from "pages/news";
import Image from "next/image";
import { getSlug } from "src/helper/generateSlug";

const FeaturedNews = () => {
  const featuredNews = useSelector(featuredNewsSelector);
  const [featured, ...rest] = featuredNews.rows ? featuredNews.rows : [];
  return (
    <Fragment>
      <Container sx={{ bgcolor: "primary.main" }} maxWidth='lg'>
        <Grid container spacing={5} sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
          <Grid item md={6} xs={12}>
            <Box>
              <Typography variant='h3' sx={{ typography: { xs: "h4" } }}>
                {featured?.title}
              </Typography>
              <Typography variant='body1' color='text.secondary' sx={{ mt: 1 }}>
                {featured?.short_description}
              </Typography>
              <LinkNext href={`/news/${featured?.id}/${getSlug(featured?.title)}`} passHref>
                <ButtonWhite
                  sx={{
                    textTransform: "capitalize",
                    mt: 3,
                    fontSize: "1rem",
                    px: { md: 4, sm: 3 },
                    py: 2,
                  }}
                // href
                >
                  read more
                </ButtonWhite>
              </LinkNext>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Paper
              sx={{
                borderRadius: "25px",
                overflow: "hidden",
                bgcolor: "primary.main",
              }}>
              <div style={{ position: "relative" }} className='img-div'>
                <Image
                  src={featured?.image || "https://picsum.photos/200"}
                  alt='Picture of the author'
                  layout='intrinsic'
                  height={600}
                  width={1000}
                  objectFit='cover'
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM0TgMAANIAm3/ipYoAAAAASUVORK5CYII='
                  placeholder='blur'
                  onError={handleImageError}
                />
              </div>
              {/* <img
                src={featured?.image}
                alt=""
                // height="300"
                onError={handleImageError}
                style={{ objectFit: "cover" }}
              /> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default FeaturedNews;
