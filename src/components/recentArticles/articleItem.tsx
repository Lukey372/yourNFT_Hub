import { Grid, Icon, Paper, Stack, Typography, Box } from "@mui/material";
import mLink from "@mui/material/Link";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React, { Fragment } from "react";
import ButtonTransparent from "src/theme/buttonTransparent";
import ButtonWhite from "src/theme/buttonWhite";
import Link from "next/link";
import moment from "moment";

// utils
import { handleImageError } from "src/common/utils/handleImageError";
import Image from "next/image";
import { getSlug } from "src/helper/generateSlug";

const ArticleItem = ({ news }) => {
  const dummy = {
    description:
      "dum Sailing the OpenSea: Grifters, SEEDS, Vortex & More Sailing the OpenSea: Grifters, SEEDS, Vortex & More Sailing the OpenSea: Grifters, SEEDS, Vortex & More",
    date: "Jan 8 2022",
  };

  const showDate = rawDate => {
    const date = new Date(rawDate);
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Link href={`news/${news.id}/${getSlug(news.title)}`} passHref>
        <Grid
          container
          alignItems='center'
          sx={{
            borderBottom: "1px solid ",
            p: 3,
            borderColor: "grey.700",
            "&:hover": { cursor: "pointer" },
            "&:last-child": { border: "0px", height: 500 },
          }}
          spacing={1}>
          <Grid item md={3} xs={12}>
            <Paper
              sx={{
                borderRadius: "10px",
                overflow: "hidden",
                bgcolor: "inherit",
                width: { md: "250px" },
                ".img-div": {
                  // objectFit: "cover",
                  height: { md: "180px" },
                  width: { xs: "95%", md: "100%" },
                  mx: "auto",
                },
              }}>
              <div style={{ position: "relative" }} className='img-div'>
                <Image
                  src={news.image || "https://picsum.photos/200"}
                  alt='Picture of the author'
                  layout='responsive'
                  height={200}
                  width={300}
                  objectFit='contain'
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcXg8AAdMBKJ79nBQAAAAASUVORK5CYII='
                  placeholder='blur'
                  onError={handleImageError}
                />
              </div>
              {/* <img src={news.image} onError={handleImageError} /> */}
            </Paper>
          </Grid>
          <Grid item md={8} xs={12}>
            <Box ml={2}>
              <Grid container spacing={1}>
                <Grid item md={4}>
                  <Typography variant='body1' color='grey.700'>
                    {news?.author ? "By " + news?.author : "By Langston Thomas"}
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant='body1' color='grey.700'>
                    {news?.created_at ? moment(news?.created_at).utc().format("MMMM DD, YYYY") : dummy.date}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant='h5' sx={{ mt: 1 }}>
                {news?.short_description ? news?.short_description : dummy.description}
              </Typography>
            </Box>
            {/* <ButtonTransparent
              sx={{
                textTransform: "capitalize",
                mt: 3,
                fontSize: ".7rem",
                px: 4,
                py: 2,
              }}
            >
              read more
            </ButtonTransparent> */}
          </Grid>
          <Grid item md={1}>
            <Stack direction='column' alignItems='center' spacing={2} ml={2}>
              <Link href={`news/${news.id}/${getSlug(news.title)}`} passHref>
                <Icon sx={{ overflow: "visible" }} component={mLink}>
                  <ArrowCircleRightIcon sx={{ fontSize: 40, color: "text.primary" }} />
                </Icon>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Link>
    </>
  );
};

export default ArticleItem;
