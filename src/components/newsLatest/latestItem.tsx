import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { Fragment } from "react";
import ButtonTransparent from "src/theme/buttonTransparent";
import ButtonWhite from "src/theme/buttonWhite";
import Link from "next/link";

import { handleImageError } from "src/common/utils/handleImageError";

//Clamp
import Clamp from "react-multiline-clamp";
import Image from "next/image";
import { getSlug } from "src/helper/generateSlug";

const LatestItem = ({ news, asSidebar }) => {
  return (
    <>
      <Grid container spacing={1} justifyContent='center' sx={{ my: 0.5 }}>
        <Grid item md={3} sm={12}>
          <Paper
            sx={{
              overflow: "hidden",
              borderRadius: "8px",
              bgcolor: "inherit",
              ".img-div": {
                width: { sm: "95%", md: "170px" },
                maxWidth: { sm: "500px" },
                height: { md: "120px" },
                mx: "auto",
              },
            }}>
            <div style={{ position: "relative" }} className='img-div'>
              <Image
                src={news.image || "https://picsum.photos/200"}
                alt='Picture of the author'
                layout='intrinsic' //intrinsic
                height={600}
                width={900}
                objectFit='cover'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcXg8AAdMBKJ79nBQAAAAASUVORK5CYII='
                placeholder='blur'
                onError={handleImageError}
              />
            </div>
            {/* <img
              // width={asSidebar ? "60px" : "120px"}
              // height={asSidebar ? "60px" : "120px"}
              src={news.image}
              onError={handleImageError}
            /> */}
          </Paper>
        </Grid>
        <Grid item md={9} sm={12}>
          <Paper sx={{ bgcolor: "inherit" }}>
            <Typography variant={asSidebar ? "body1" : "h6"}>
              <Clamp withTooltip lines={2}>
                {news.title}
              </Clamp>
            </Typography>
            <Link href={`/news/${news.id}/${getSlug(news.title)}`} passHref>
              <ButtonTransparent
                sx={{
                  textTransform: "capitalize",
                  mt: 1,
                  fontSize: ".7rem",
                  px: 1,
                  "&:hover": {
                    backgroundColor: "#1e1e1e",
                  },
                }}>
                read more {"  "}
                <ArrowForwardIcon sx={{ ml: 2, fontSize: "1.1rem" }} />
              </ButtonTransparent>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LatestItem;
